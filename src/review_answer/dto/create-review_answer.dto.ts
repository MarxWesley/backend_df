import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReviewAnswerDto {
    @IsNotEmpty({message: "O ID da questão é obrigatório."})
    @IsNumber({}, {message: "O ID da questão deve ser um número."})
    questionId: number;

    @IsNotEmpty({message: "A resposta não pode ser vazia."})
    answer: string;
}