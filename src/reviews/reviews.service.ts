import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { In, Repository } from 'typeorm';
import { ReviewAnswer } from 'src/review_answer/entities/review_answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Person } from 'src/people/entities/person.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) 
    private reviewRepository: Repository<Review>,

    @InjectRepository(ReviewAnswer)
    private reviewAnswerRepository: Repository<ReviewAnswer>,

    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const { personId, answers, ...reviewData } = createReviewDto;

    const person = await this.personRepository.findOne({ where: { id: personId } });

    if (!person) {
      throw new NotFoundException(`Pessoa não encontrada.`);
    }

    const questionsIds = answers.map(answer => answer.questionId);

    const questions = await this.questionRepository.find({
      where: { id: In(questionsIds) },
    });

    if(questions.length !== questionsIds.length) {
      throw new NotFoundException(`Uma ou mais questões não foram encontradas.`);
    }

    const review = this.reviewRepository.create({
      ...reviewData,
      person,
    });

    const savedReview = await this.reviewRepository.save(review);

    const reviewAnswers = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);

      return this.reviewAnswerRepository.create({
        answer: answer.answer,
        review: savedReview,
        question,
      });
    });

    await this.reviewAnswerRepository.save(reviewAnswers);

    return await this.reviewRepository.findOne({
      where: { id: savedReview.id },
      relations: ['person', 'answers', 'answers.question'],
    });
  }

  findAll() {
    return this.reviewRepository.find({
      relations: ['person', 'answers', 'answers.question'],
      order: { data_avaliacao: 'DESC' },
    })
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['person', 'answers', 'answers.question'],
    });
    if (!review) {
      throw new NotFoundException(`Avaliação não encontrada.`);
    }
    return review;
  }

  async findByPersonName(name: string) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.person', 'person')
      .where('person.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async remove(id: number) {
    const review = await this.findOne(id);

    await this.reviewRepository.remove(review);    

    return { message: 'Avaliação removida com sucesso.' };
  }
}
