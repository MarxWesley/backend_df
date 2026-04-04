import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString({ message: "Campo deve ser String" })
    @IsNotEmpty({ message: "Campo não pode ser vazio" })
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        name: 'question',
        description: 'pergunta a ser cadastrada',
        example: 'Qual é a capital da França?'
    })
    question: string;
}