import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const emailAlreadyExist = await this.findByEmail(createUserDto.email)

    const role = await this.roleRepository.findOne({where: {id: createUserDto.roleId }});

    if (!role) {
      throw new ForbiddenException("Role não existe")
    }

    if (emailAlreadyExist) {
      throw new ForbiddenException("Este email já está em uso!")
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
    });

    console.log(newUser)

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    try {
      return await this.userRepository.find({relations: ['role'],
        select: {
          id: true,
          name: true,
          email: true,
          role: {
            name: true
          },
        }
      });
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role'],
        select: {
          id: true,
          name: true,
          email: true,
          role: {
            name: true
          },
        }
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
    const user = await this.userRepository.findOne({ where: { email }, relations: ['role'] });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.findOne(id);

    // 🔐 só criptografa se vier senha
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = this.userRepository.merge(
      userToUpdate,
      updateUserDto
    );

    return this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
