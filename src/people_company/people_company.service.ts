import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeopleCompanyDto } from './dto/create-people_company.dto';
import { UpdatePeopleCompanyDto } from './dto/update-people_company.dto';
import { PeopleCompany } from './entities/people_company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleCompanyStatus } from './enums/people-company-status.enum';
import { CompaniesService } from 'src/companies/companies.service';
import { PeopleService } from 'src/people/people.service';

@Injectable()
export class PeopleCompanyService {
  constructor(
    @InjectRepository(PeopleCompany)
    private peopleCompanyRepository: Repository<PeopleCompany>,

    private companiesService: CompaniesService,

    private peopleService: PeopleService,
  ) { }

  async create(createPeopleCompanyDto: CreatePeopleCompanyDto) {
    const empresa = await this.companiesService.findOne(createPeopleCompanyDto.empresa_id);

    const pessoa = await this.peopleService.findOne(createPeopleCompanyDto.pessoa_id);

    // Verifica se a pessoa já tem vínculo ATIVO em qualquer empresa
    const vinculoAtivoEmQualquerEmpresa = await this.peopleCompanyRepository.findOne({
      where: {
        pessoa_id: createPeopleCompanyDto.pessoa_id,
        status: PeopleCompanyStatus.ATIVO,
      },
      relations: ['empresa'],
    });

    if (vinculoAtivoEmQualquerEmpresa) {
      throw new ConflictException(
        `Essa pessoa já possui um vínculo ativo na empresa "${vinculoAtivoEmQualquerEmpresa.empresa.nome_fantasia}".`,
      );
    }

    if (createPeopleCompanyDto.data_desligamento && createPeopleCompanyDto.data_desligamento < createPeopleCompanyDto.data_admissao) {
      throw new BadRequestException('A data de desligamento não pode ser anterior à data de admissão.');
    }

    const vinculo = this.peopleCompanyRepository.create(createPeopleCompanyDto);
    return await this.peopleCompanyRepository.save(vinculo);
  }

  async findAll() {
    return await this.peopleCompanyRepository.find({
      relations: ['empresa', 'pessoa'],
      order: { data_admissao: 'DESC' },
      where: { status: PeopleCompanyStatus.ATIVO },
    });
  }

  async findOne(id: number) {
    const vinculo = await this.peopleCompanyRepository.findOne({
      where: { id },
      relations: ['empresa', 'pessoa'],
    });

    if (!vinculo) {
      throw new NotFoundException(`Vínculo com ID ${id} não encontrado.`);
    }

    return vinculo;
  }

  async findByPessoa(pessoa_id: number) {
    const vinculos = await this.peopleCompanyRepository.find({
      where: { pessoa_id },
      relations: ['empresa', 'pessoa'],
      order: { data_admissao: 'DESC' },
    });

    if (vinculos.length === 0) {
      throw new NotFoundException(`Nenhum vínculo encontrado para a pessoa com ID ${pessoa_id}.`);
    }

    return vinculos;
  }

  async update(id: number, updatePeopleCompanyDto: UpdatePeopleCompanyDto) {
    const vinculo = await this.findOne(id);

    // Só busca a empresa se o ID foi enviado
    if (updatePeopleCompanyDto.empresa_id) {
      await this.companiesService.findOne(updatePeopleCompanyDto.empresa_id);
    }

    // Só busca a pessoa se o ID foi enviado
    if (updatePeopleCompanyDto.pessoa_id) {
      await this.peopleService.findOne(updatePeopleCompanyDto.pessoa_id);
    }

    // Se estiver tentando reativar ou trocar de empresa, verifica conflito
    if (updatePeopleCompanyDto.status === PeopleCompanyStatus.ATIVO || updatePeopleCompanyDto.empresa_id) {
      const vinculoAtivo = await this.peopleCompanyRepository
        .createQueryBuilder('pc')
        .leftJoinAndSelect('pc.empresa', 'empresa')
        .where('pc.pessoa_id = :pessoa_id', { pessoa_id: vinculo.pessoa_id })
        .andWhere('pc.status = :status', { status: PeopleCompanyStatus.ATIVO })
        .andWhere('pc.id != :id', { id }) // ignora o próprio registro
        .getOne();

      if (vinculoAtivo) {
        throw new ConflictException(
          `Essa pessoa já possui um vínculo ativo na empresa "${vinculoAtivo.empresa.nome_fantasia}".`,
        );
      }
    }

    const admissao = updatePeopleCompanyDto.data_admissao ?? vinculo.data_admissao;
    const desligamento = updatePeopleCompanyDto.data_desligamento ?? vinculo.data_desligamento;

    if (desligamento && desligamento < admissao) {
      throw new BadRequestException('A data de desligamento não pode ser anterior à data de admissão.');
    }

    const updated = this.peopleCompanyRepository.merge(vinculo, updatePeopleCompanyDto);
    return await this.peopleCompanyRepository.save(updated);
  }

  async remove(id: number) {
    const vinculo = await this.findOne(id);

    return await this.peopleCompanyRepository.remove(vinculo);
  }
}
