import { ConflictException, Injectable, NotFoundException, Search } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Like, Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    const cpfExists = await this.personRepository.findOne({ where: { cpf: createPersonDto.cpf } });

    const today = new Date();

    if (cpfExists) {
      throw new ConflictException({
        message: 'CPF já existe',
        field: 'cpf'
      });
    }

    if (createPersonDto.data_nascimento && createPersonDto.data_nascimento > today) {
      throw new ConflictException({
        message: 'Data de nascimento não pode ser no futuro',
        field: 'data_nascimento'
      });
    }

    if (createPersonDto.data_entrada && createPersonDto.data_entrada > today) {
      throw new ConflictException({
        message: 'Data de entrada não pode ser no futuro',
        field: 'data_entrada'
      });
    }

    const person = this.personRepository.create(createPersonDto);

    return this.personRepository.save(person);
  }

  async findAll() {
    const people = await this.personRepository.find({ where: { ativo: true }, relations: ['role'] });

    if (!people) {
      throw new NotFoundException('Nenhuma pessoa encontrada');
    }

    return people;
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne({ where: { id }, relations: ['role'] });

    if (!person) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return person;
  }

  async findByNameOrCpf(search: string) {
    if (!search) {
      throw new NotFoundException('Parâmetro de busca é obrigatório');
    }

    return this.personRepository.createQueryBuilder('person')
      .where('person.nome LIKE :search', { search: `%${search}%` })
      .orWhere('person.cpf LIKE :search', { search: `%${search}%` })
      .andWhere('person.ativo = :ativo', { ativo: true })
      .orderBy('person.nome', 'ASC')
      .getMany()
      .catch(() => {
        throw new NotFoundException('Nenhuma pessoa encontrada com o nome ou CPF especificado');
      });
  }

  async findByRoleName(roleName: string) {
    try {
      const people = await this.personRepository.find({ where: { role: { name: roleName }, ativo: true }, relations: ['role'] });

      if (people.length === 0) {
        throw new NotFoundException('Nenhuma pessoa encontrada com o papel especificado');
      }

      return people;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);
    const today = new Date();

    if (updatePersonDto.cpf && updatePersonDto.cpf !== person.cpf) {
      const cpfExists = await this.personRepository.findOne({ where: { cpf: updatePersonDto.cpf } });

      if (cpfExists) {
        throw new ConflictException({
          message: 'CPF já existe',
          field: 'cpf'
        });
      }
    }

    if (updatePersonDto.data_nascimento && updatePersonDto.data_nascimento > today) {
      throw new ConflictException({
        message: 'Data de nascimento não pode ser no futuro',
        field: 'data_nascimento'
      });
    }

    if (updatePersonDto.data_entrada && updatePersonDto.data_entrada > today) {
      throw new ConflictException({
        message: 'Data de entrada não pode ser no futuro',
        field: 'data_entrada'
      });
    }

    const updatedPerson = this.personRepository.merge(person, updatePersonDto);

    return this.personRepository.save(updatedPerson);
  }

  async alterarStatus(id: number) {
    const person = await this.findOne(id);

    person.ativo = !person.ativo;

    return await this.personRepository.save(person);
  }
}