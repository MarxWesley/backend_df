import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @Transform(({ value }) => value.trim().toUpperCase())
    @IsString({message: "Campo deve ser String"})
    @IsNotEmpty({message: "campo não pode ser em branco"})
    @ApiProperty({
        name: 'string',
        description: 'nível de acesso',
        example: 'Ex: Admin, Professor, RH',
        nullable: false
    })
    name: string;
}