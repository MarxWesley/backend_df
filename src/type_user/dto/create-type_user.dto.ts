import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypeUserDto {
    @Transform(({ value }) => value.trim().toUpperCase())
    @IsString({message: "Campo deve ser String"})
    @IsNotEmpty({message: "campo não pode ser em branco"})
    @ApiProperty({
        type: 'string',
        description: 'nível de acesso',
        example: 'Ex: Admin, Professor, User',
        nullable: false
    })
    type: string;
}