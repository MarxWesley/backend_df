import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from "class-validator";
import { PeopleCompanyStatus } from "../enums/people-company-status.enum";

export class CreatePeopleCompanyDto {
    @ApiProperty({ description: 'ID da pessoa', example: 1 })
    @IsInt({ message: 'O ID da pessoa deve ser um número inteiro.' })
    @IsPositive({ message: 'O ID da pessoa deve ser positivo.' })
    @IsNotEmpty({ message: 'O ID da pessoa é obrigatório.' })
    pessoa_id: number;

    @ApiProperty({ description: 'ID da empresa', example: 1 })
    @IsInt({ message: 'O ID da empresa deve ser um número inteiro.' })
    @IsPositive({ message: 'O ID da empresa deve ser positivo.' })
    @IsNotEmpty({ message: 'O ID da empresa é obrigatório.' })
    empresa_id: number;

    @ApiProperty({ description: 'Data de admissão', example: '2024-01-15' })
    @IsDateString({}, { message: 'A data de admissão deve ser uma data válida (YYYY-MM-DD).' })
    @IsNotEmpty({ message: 'A data de admissão é obrigatória.' })
    data_admissao: string;

    @ApiPropertyOptional({ description: 'Data de desligamento', example: '2025-06-30' })
    @IsOptional()
    @IsDateString({}, { message: 'A data de desligamento deve ser uma data válida (YYYY-MM-DD).' })
    data_desligamento?: string | null;

    @ApiProperty({ description: 'Função/cargo da pessoa na empresa', example: 'Analista de TI' })
    @IsString({ message: 'A função deve ser uma string.' })
    @IsNotEmpty({ message: 'A função é obrigatória.' })
    @Length(2, 100, { message: 'A função deve ter entre 2 e 100 caracteres.' })
    funcao: string;

    @ApiProperty({ description: 'Nome do RH responsável por essa pessoa', example: 'Maria Silva' })
    @IsString({ message: 'O contato de RH deve ser uma string.' })
    @IsNotEmpty({ message: 'O contato de RH é obrigatório.' })
    @Length(2, 100, { message: 'O contato de RH deve ter entre 2 e 100 caracteres.' })
    contato_rh: string;

    @ApiProperty({
        description: 'Status do vínculo',
        enum: PeopleCompanyStatus,
        example: PeopleCompanyStatus.ATIVO,
    })
    @IsEnum(PeopleCompanyStatus, {
        message: `Status inválido. Valores aceitos: ${Object.values(PeopleCompanyStatus).join(', ')}`,
    })
    @IsNotEmpty({ message: 'O status é obrigatório.' })
    status: PeopleCompanyStatus;
}
