import { PartialType } from '@nestjs/swagger';
import { CreateReviewAnswerDto } from './create-review_answer.dto';

export class UpdateReviewAnswerDto extends PartialType(CreateReviewAnswerDto) {}
