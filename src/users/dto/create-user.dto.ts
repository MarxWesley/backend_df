import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @Transform(({value}) => value.trim().toUpperCase())
    @IsNotEmpty({message: "campo não pode ser em branco"})
    @IsString({message: "Campo deve ser String"})
    @ApiProperty({
        name: 'name',
        description: 'nome do usuário',
        example: 'Ex: João da Silva',
        nullable: false
    })
    name: string;

    @Transform(({value}) => value.trim().toLowerCase())
    @IsNotEmpty({message: "campo não pode ser em branco"})
    @IsEmail({}, {message: "campo deve ser um email válido"})
    @IsString({message: "Campo deve ser String"})
    @ApiProperty({
        name: 'email',
        description: 'email do usuário',
        example: 'Ex: teste@exemplo.com',
        nullable: false
    })
    email: string;

    @IsNotEmpty({message: "campo não pode ser em branco"})
    @ApiProperty({
        name: 'password',
        description: 'senha do usuário',
        example: 'Ex: senha123',
        nullable: false
    })
    @Length(6, 100, {message: "A senha deve ser maior que 6 caracteres"})
    password: string;

    @IsNotEmpty({message: "campo não pode ser em branco"})
    @IsNumber({}, {message: "campo deve ser um númerico"})
    @ApiProperty({
        name: 'roleId',
        description: 'ID do papel do usuário',
        example: 1,
        nullable: false
    })
    roleId: number;
}