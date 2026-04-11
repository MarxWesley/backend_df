import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const cnpjExists = await this.companyRepository.findOne({ where: { cnpj: createCompanyDto.cnpj } });

    if (cnpjExists) {
      throw new ConflictException('CNPJ já está cadastrado');
    }

    const company = this.companyRepository.create(createCompanyDto);

    return await this.companyRepository.save(company);
  }

  async findAll() {
    return await this.companyRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`Empresa não encontrada!`);
    }
    return company;
  }

  async findByNameOrCnpj(search: string) {
    if (!search) {
      throw new NotFoundException('Parâmetro de busca é obrigatório');
    }

    const results = await this.companyRepository
      .createQueryBuilder('company')
      .where('company.nome_fantasia ILIKE :search', { search: `%${search}%` })
      .orWhere('company.razao_social ILIKE :search', { search: `%${search}%` })
      .orWhere('company.cnpj LIKE :search', { search: `%${search}%` })
      .orderBy('company.nome_fantasia', 'ASC')
      .getMany();

    if (results.length === 0) {
      throw new NotFoundException('Nenhuma empresa encontrada para a busca informada.');
    }

    return results;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);

    // Se estiver tentando atualizar o CNPJ, verifica se já pertence a outra empresa
    if (updateCompanyDto.cnpj && updateCompanyDto.cnpj !== company.cnpj) {
      const cnpjExists = await this.companyRepository.findOne({
        where: { cnpj: updateCompanyDto.cnpj },
      });

      if (cnpjExists) {
        throw new ConflictException('CNPJ já está cadastrado para outra empresa.');
      }
    }

    const updated = this.companyRepository.merge(company, updateCompanyDto);
    return await this.companyRepository.save(updated);
  }

  async remove(id: number) {
    const company = await this.findOne(id);

    return await this.companyRepository.remove(company);
  }
}
