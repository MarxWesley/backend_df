import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewAnswerService } from './review_answer.service';
import { CreateReviewAnswerDto } from './dto/create-review_answer.dto';
import { UpdateReviewAnswerDto } from './dto/update-review_answer.dto';

@Controller('review-answer')
export class ReviewAnswerController {
  constructor(private readonly reviewAnswerService: ReviewAnswerService) {}

  @Post()
  create(@Body() createReviewAnswerDto: CreateReviewAnswerDto) {
    return this.reviewAnswerService.create(createReviewAnswerDto);
  }

  @Get()
  findAll() {
    return this.reviewAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewAnswerDto: UpdateReviewAnswerDto) {
    return this.reviewAnswerService.update(+id, updateReviewAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewAnswerService.remove(+id);
  }
}
