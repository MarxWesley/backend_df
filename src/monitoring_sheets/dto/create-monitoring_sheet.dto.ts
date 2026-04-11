import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class CreateMonitoringSheetDto {
    @ApiProperty({ description: 'ID do vínculo pessoa-empresa', example: 1 })
    @IsInt({ message: 'O ID do vínculo deve ser um número inteiro.' })
    @IsPositive({ message: 'O ID do vínculo deve ser positivo.' })
    @IsNotEmpty({ message: 'O ID do vínculo é obrigatório.' })
    people_company_id: number;

    @ApiProperty({ description: 'Data da visita', example: '2025-04-10' })
    @IsDateString({}, { message: 'A data da visita deve ser uma data válida (YYYY-MM-DD).' })
    @IsNotEmpty({ message: 'A data da visita é obrigatória.' })
    data_visita: string;

    @ApiProperty({ description: 'Nome do RH responsável pela visita', example: 'Maria Silva' })
    @IsString({ message: 'O contato de RH deve ser uma string.' })
    @IsNotEmpty({ message: 'O contato de RH é obrigatório.' })
    @Length(2, 100, { message: 'O contato de RH deve ter entre 2 e 100 caracteres.' })
    contato_rh: string;

    @ApiPropertyOptional({ description: 'Parecer geral da visita', example: 'Colaborador demonstra boa adaptação ao ambiente de trabalho.' })
    @IsOptional()
    @IsString({ message: 'O parecer geral deve ser uma string.' })
    parecer_geral?: string;
}
