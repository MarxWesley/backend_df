import { Module } from '@nestjs/common';
import { ReviewAnswerService } from './review_answer.service';
import { ReviewAnswerController } from './review_answer.controller';

@Module({
  controllers: [ReviewAnswerController],
  providers: [ReviewAnswerService],
})
export class ReviewAnswerModule {}
