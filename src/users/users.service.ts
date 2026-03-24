import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const emailAlreadyExist = await this.findByEmail(createUserDto.email)

    if (emailAlreadyExist) {
      throw new ForbiddenException("Este email já está em uso!")
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    try {
      return await this.userRepository.find()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id }
      });

      if (!user) throw new NotFoundException("Usuário não encontrado.")

      return user;
    } catch (error) {
      throw error
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } })

    return user
  }

  async findByEmailOrFail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.findOne(id);

    const updatedUser = this.userRepository.merge(userToUpdate, updateUserDto)

    return this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
