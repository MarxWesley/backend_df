import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor (
    @InjectRepository(Question)
    private questionRepository: Repository<Question>
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);

    return await this.questionRepository.save(question);
  }

  findAll() {
    return this.questionRepository.find();
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question  not found`);
    }

    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOne(id);

    const updatedQuestion = this.questionRepository.merge(question, updateQuestionDto);

    return await this.questionRepository.save(updatedQuestion);
  }

  async remove(id: number) {
    return await this.questionRepository.delete(id);
  }
}
