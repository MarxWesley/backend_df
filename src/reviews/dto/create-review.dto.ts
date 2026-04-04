import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateReviewAnswerDto } from "src/review_answer/dto/create-review_answer.dto";

export class CreateReviewDto {
    @IsNumber({}, { message: "O ID da pessoa deve ser um número." })
    @ApiProperty({
        name: 'personId',
        description: 'ID da pessoa que está fazendo a avaliação',
        example: 1
    })
    personId: number;
    
    @IsString({ message: "O tipo de avaliação deve ser uma string." })
    @ApiProperty({
        name: 'tipo',
        description: 'Tipo de avaliação',
        example: 'Avaliação de desempenho'
    })
    tipo?: string;
    
    @IsString({ message: "O nome do professor responsável deve ser uma string." })
    @ApiProperty({
        name: 'professor_responsavel',
        description: 'Nome do professor responsável',
        example: 'John Doe'
    })
    professor_responsavel?: string;

    @IsArray()
    @ApiProperty({
        name: 'answers',
        description: 'Respostas da avaliação',
        example: [
            {
                questionId: 1,
                answer: 'Excelente'
            }
        ]
    })
    @ValidateNested({ each: true })
    @Type(() => CreateReviewAnswerDto)
    answers: CreateReviewAnswerDto[];
}
