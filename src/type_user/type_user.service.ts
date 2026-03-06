import { Injectable } from '@nestjs/common';
import { CreateTypeUserDto } from './dto/create-type_user.dto';
import { UpdateTypeUserDto } from './dto/update-type_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeUser } from './entities/type_user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeUserService {
  constructor(
    @InjectRepository(TypeUser)
    private typeUserRepository: Repository<TypeUser>
  ) {}

  create(createTypeUserDto: CreateTypeUserDto) {
    return 'This action adds a new typeUser';
  }

  async findAll() {
    try {
      return  await this.typeUserRepository.find()
    } catch (error) {
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} typeUser`;
  }

  update(id: number, updateTypeUserDto: UpdateTypeUserDto) {
    return `This action updates a #${id} typeUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeUser`;
  }
}
