import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    if(createUserDto.name === "" || createUserDto.name == null) {
      throw new Error("O nome do usuário não deve ser vazio ou nulo")
    }
    
    if(createUserDto.email === "" || createUserDto.email == null) {
      throw new Error("O email do usuário não deve ser vazio ou nulo")
    }

    if(createUserDto.password === "" || createUserDto.password == null) {
      throw new Error("A senha do usuário não deve ser vazia ou nula")
    }

    if(createUserDto.roleId === null || createUserDto.roleId === undefined) {
      throw new Error("O ID do papel do usuário não deve ser vazio ou nulo")
    }

    const newUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    try {
      return await this.userRepository.find()
    } catch (error){
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.find({
        where: {id}
      });

      if(!user) throw new NotFoundException("Usuário não encontrado.")

      return user;
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.findOne(id);

    if (!userToUpdate) throw new NotFoundException("Usuário não encontrado")

    if (updateUserDto.name === "" || updateUserDto.name == null) {
      throw new ForbiddenException("O nome não deve ser vazio ou nulo")
    }  

    if (updateUserDto.email === "" || updateUserDto.email == null) {
      throw new ForbiddenException("O email não deve ser vazio ou nulo")
    }  

     if(updateUserDto.roleId == null || updateUserDto.roleId === undefined) {
      throw new Error("O ID do papel do usuário não deve ser vazio ou nulo")
    }

    const updatedUser = this.userRepository.merge(userToUpdate, updateUserDto)

    return this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
