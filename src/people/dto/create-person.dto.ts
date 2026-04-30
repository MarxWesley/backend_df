import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreatePersonDto {
    @IsString({ message: "Campo deve ser String" })
    @IsNotEmpty({ message: "campo não pode ser em branco" })
    @Transform(({ value }) => value.trim().toUpperCase())
    @Length(1, 100)
    @ApiProperty({
        name: 'nome',
        description: 'nome da pessoa',
        example: 'Neymar Junior',
        nullable: false
    })
    nome: string;

    @IsString({ message: "Campo deve ser String" })
    @IsNotEmpty({ message: "campo não pode ser em branco" })
    @Length(11, 11)
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        name: 'cpf',
        description: 'CPF da pessoa',
        example: '12345678901',
        nullable: false
    })
    cpf: string;

    @IsNotEmpty({ message: "campo não pode ser em branco" })
    @IsNumber({}, { message: "campo deve ser um númerico" })
    @ApiProperty({
        name: 'roleId',
        description: 'ID do papel da pessoa',
        example: 3,
        nullable: false
    })
    roleId: number;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        name: 'data_nascimento',
        description: 'data de nascimento da pessoa',
        example: '1990-01-01',
        nullable: true
    })
    data_nascimento?: Date;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        name: 'data_entrada',
        description: 'data de entrada da pessoa',
        example: '2020-01-01',
        nullable: true
    })
    data_entrada?: Date;

    @IsOptional()
    @IsString({ message: "Campo deve ser String" })
    @Length(0, 20)
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        name: 'telefone',
        description: 'telefone da pessoa',
        example: '11987654321',
        nullable: true
    })
    telefone?: string;

    @IsOptional()
    @IsString({ message: "Campo deve ser String" })
    @Length(0, 100)
    @Transform(({ value }) => value.trim().toUpperCase())
    @ApiProperty({
        name: 'nome_responsavel',
        description: 'nome do responsável',
        example: 'Neymar Pai',
        nullable: true
    })
    nome_responsavel?: string;

    @IsOptional()
    @IsString({ message: "Campo deve ser String" })
    @Length(0, 20)
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        name: 'telefone_responsavel',
        description: 'telefone do responsável',
        example: '11987654321',
        nullable: true
    })
    telefone_responsavel?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        name: 'usa_medicamento',
        description: 'indica se a pessoa usa medicamento',
        example: true,
        nullable: true
    })
    usa_medicamento?: boolean;

    @IsOptional()
    @IsString({ message: "Campo deve ser String" })
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        name: 'info_medicamentos',
        description: 'informações sobre os medicamentos',
        example: 'Toma remédio para pressão',
        nullable: true
    })
    info_medicamentos?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        name: 'ativo',
        description: 'indica se a pessoa está ativa',
        example: true,
        nullable: true
    })
    ativo?: boolean;
}