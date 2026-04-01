import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreatePersonDto {
    @IsString({message: "Campo deve ser String"})
    @IsNotEmpty({message: "campo não pode ser em branco"})
    @Length(1, 100)
    nome: string;

    @IsString({message: "Campo deve ser String"})
    @IsNotEmpty({message: "campo não pode ser em branco"})
    @Length(11, 11)
    cpf: string;

    @IsOptional()
    @IsDateString()
    data_nascimento?: Date;

    @IsOptional()
    @IsDateString()
    data_entrada?: Date;

    @IsOptional()
    @IsString({message: "Campo deve ser String"})
    @Length(0, 20)
    telefone?: string;

    @IsOptional()
    @IsString({message: "Campo deve ser String"})
    @Length(0, 100)
    nome_responsavel?: string;

    @IsOptional()
    @IsString({message: "Campo deve ser String"})
    @Length(0, 20)
    telefone_responsavel?: string;

    @IsOptional()
    @IsBoolean()
    usa_medicamento?: boolean;

    @IsOptional()
    @IsString({message: "Campo deve ser String"})
    info_medicamentos?: string;

    @IsOptional()
    @IsBoolean()
    ativo?: boolean;
}