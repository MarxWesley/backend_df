import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  create(createRoleDto: CreateRoleDto) {
    if (createRoleDto.name === "" || createRoleDto.name == null) {
      throw new ForbiddenException("O tipo de acesso não deve ser vazio ou nulo")
    }
    
    const newRole = this.roleRepository.create(createRoleDto);

    return this.roleRepository.save(newRole);
  }

  async findAll() {
    try {
      return  await this.roleRepository.find()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
     try {
      const role = await this.roleRepository.findOne(
        {
          where: { id }
        });

      if (!role) throw new NotFoundException("Tipo de acesso não encontrado")

      return role;

    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const roleToUpdate = await this.findOne(id);

    if (!roleToUpdate) {
      throw new NotFoundException("Tipo de acesso não encontrado")
    }

    if (updateRoleDto.name === "" || updateRoleDto.name == null) {
      throw new ForbiddenException("O tipo de acesso não deve ser vazio ou nulo")
    }

    const updatedRole = this.roleRepository.merge(roleToUpdate, updateRoleDto);

    return this.roleRepository.save(updatedRole);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.roleRepository.delete(id);
  }
}