import { Injectable } from '@nestjs/common';
import { CreateTypeUserDto } from './dto/create-type_user.dto';
import { UpdateTypeUserDto } from './dto/update-type_user.dto';

@Injectable()
export class TypeUserService {
  create(createTypeUserDto: CreateTypeUserDto) {
    return 'This action adds a new typeUser';
  }

  findAll() {
    return `This action returns all typeUser`;
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
