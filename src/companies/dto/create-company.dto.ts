import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsOptional,
    Length,
    Matches,
} from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({
        description: 'Nome fantasia da empresa',
        example: 'Tech Solutions',
        maxLength: 100,
    })
    @IsString({ message: 'O nome fantasia deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome fantasia não pode estar vazio.' })
    @Length(2, 100, { message: 'O nome fantasia deve ter entre 2 e 100 caracteres.' })
    nome_fantasia: string;

    @ApiProperty({
        description: 'Razão social da empresa',
        example: 'Tech Solutions Ltda.',
        maxLength: 150,
    })
    @IsString({ message: 'A razão social deve ser uma string.' })
    @IsNotEmpty({ message: 'A razão social não pode estar vazia.' })
    @Length(2, 150, { message: 'A razão social deve ter entre 2 e 150 caracteres.' })
    razao_social: string;

    @ApiProperty({
        description: 'CNPJ da empresa (somente números)',
        example: '12345678000199',
        minLength: 14,
        maxLength: 14,
    })
    @IsString({ message: 'O CNPJ deve ser uma string.' })
    @IsNotEmpty({ message: 'O CNPJ não pode estar vazio.' })
    @Length(14, 14, { message: 'O CNPJ deve conter exatamente 14 dígitos.' })
    @Matches(/^\d{14}$/, { message: 'O CNPJ deve conter apenas números.' })
    cnpj: string;

    @ApiProperty({
        description: 'Telefone da empresa (somente números)',
        example: '11987654321',
        minLength: 10,
        maxLength: 11,
    })
    @IsString({ message: 'O telefone deve ser uma string.' })
    @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
    @Matches(/^\d{10,11}$/, { message: 'O telefone deve conter apenas números, com DDD (10 ou 11 dígitos).' })
    telefone: string;

    // — Endereço —

    @ApiProperty({
        description: 'Logradouro (rua, avenida, etc.)',
        example: 'Rua das Flores',
        maxLength: 150,
    })
    @IsString({ message: 'O logradouro deve ser uma string.' })
    @IsNotEmpty({ message: 'O logradouro não pode estar vazio.' })
    @Length(2, 150, { message: 'O logradouro deve ter entre 2 e 150 caracteres.' })
    logradouro: string;

    @ApiProperty({
        description: 'Número do endereço',
        example: '123',
        maxLength: 10,
    })
    @IsString({ message: 'O número deve ser uma string.' })
    @IsNotEmpty({ message: 'O número não pode estar vazio.' })
    @Length(1, 10, { message: 'O número deve ter entre 1 e 10 caracteres.' })
    numero: string;

    @ApiPropertyOptional({
        description: 'Complemento do endereço',
        example: 'Sala 42',
        maxLength: 100,
    })
    @IsOptional()
    @IsString({ message: 'O complemento deve ser uma string.' })
    complemento?: string;

    @ApiProperty({
        description: 'Bairro',
        example: 'Centro',
        maxLength: 100,
    })
    @IsString({ message: 'O bairro deve ser uma string.' })
    @IsNotEmpty({ message: 'O bairro não pode estar vazio.' })
    @Length(2, 100, { message: 'O bairro deve ter entre 2 e 100 caracteres.' })
    bairro: string;

    @ApiProperty({
        description: 'Cidade',
        example: 'São Paulo',
        maxLength: 100,
    })
    @IsString({ message: 'A cidade deve ser uma string.' })
    @IsNotEmpty({ message: 'A cidade não pode estar vazia.' })
    @Length(2, 100, { message: 'A cidade deve ter entre 2 e 100 caracteres.' })
    cidade: string;

    @ApiProperty({
        description: 'UF (sigla do estado)',
        example: 'SP',
        minLength: 2,
        maxLength: 2,
    })
    @IsString({ message: 'A UF deve ser uma string.' })
    @IsNotEmpty({ message: 'A UF não pode estar vazia.' })
    @Length(2, 2, { message: 'A UF deve conter exatamente 2 caracteres.' })
    @Matches(/^[A-Z]{2}$/, { message: 'A UF deve conter apenas letras maiúsculas.' })
    uf: string;

    @ApiProperty({
        description: 'CEP (somente números)',
        example: '01310100',
        minLength: 8,
        maxLength: 8,
    })
    @IsString({ message: 'O CEP deve ser uma string.' })
    @IsNotEmpty({ message: 'O CEP não pode estar vazio.' })
    @Length(8, 8, { message: 'O CEP deve conter exatamente 8 dígitos.' })
    @Matches(/^\d{8}$/, { message: 'O CEP deve conter apenas números.' })
    cep: string;

    // — Contato RH —

    @ApiProperty({
        description: 'Nome do contato de RH',
        example: 'Maria Silva',
        maxLength: 100,
    })
    @IsString({ message: 'O nome do contato de RH deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome do contato de RH não pode estar vazio.' })
    @Length(2, 100, { message: 'O nome do contato de RH deve ter entre 2 e 100 caracteres.' })
    contato_rh_nome: string;

    @ApiProperty({
        description: 'E-mail do contato de RH',
        example: 'maria.silva@techsolutions.com.br',
    })
    @IsEmail({}, { message: 'O e-mail do contato de RH é inválido.' })
    @IsNotEmpty({ message: 'O e-mail do contato de RH não pode estar vazio.' })
    contato_rh_email: string;
}