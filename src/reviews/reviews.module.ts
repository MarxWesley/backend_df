import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewAnswer } from 'src/review_answer/entities/review_answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Person } from 'src/people/entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, ReviewAnswer, Question, Person])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
