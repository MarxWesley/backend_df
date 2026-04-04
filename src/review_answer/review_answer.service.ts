import { Injectable } from '@nestjs/common';
import { CreateReviewAnswerDto } from './dto/create-review_answer.dto';
import { UpdateReviewAnswerDto } from './dto/update-review_answer.dto';

@Injectable()
export class ReviewAnswerService {
  create(createReviewAnswerDto: CreateReviewAnswerDto) {
    return 'This action adds a new reviewAnswer';
  }

  findAll() {
    return `This action returns all reviewAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewAnswer`;
  }

  update(id: number, updateReviewAnswerDto: UpdateReviewAnswerDto) {
    return `This action updates a #${id} reviewAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewAnswer`;
  }
}
