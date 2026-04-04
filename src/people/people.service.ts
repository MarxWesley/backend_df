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

    if (cpfExists) {
      throw new ConflictException('CPF já existe');
    }

    const person = this.personRepository.create(createPersonDto);

    return this.personRepository.save(person);
  }

  async findAll() {
    const people = await this.personRepository.find({where: {ativo: true}});

    if (!people) {
      throw new NotFoundException('Nenhuma pessoa encontrada');
    }

    return people;
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return person;
  }

  async findByNameOrCpf(serach: string) {
    if(!Search) {
      throw new NotFoundException('Parâmetro de busca é obrigatório');
    }

    return this.personRepository.createQueryBuilder('person')
      .where('person.nome LIKE :search', { search: `%${serach}%` })
      .orWhere('person.cpf LIKE :search', { search: `%${serach}%` })
      .andWhere('person.ativo = :ativo', { ativo: true })
      .orderBy('person.nome', 'ASC')
      .getMany();
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);

    if (updatePersonDto.cpf && updatePersonDto.cpf !== person.cpf) {
      const cpfExists = await this.personRepository.findOne({ where: { cpf: updatePersonDto.cpf } });

      if (cpfExists) {
        throw new ConflictException('CPF já existe');
      }
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