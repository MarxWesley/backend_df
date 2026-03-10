import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly typeUserService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiQuery({name: 'name', description: 'The name of the role', required: true, example: 'Admin'})
  create(@Body() createTypeUserDto: CreateRoleDto) {
    return this.typeUserService.create(createTypeUserDto);
  }

  @Get()
  findAll() {
    return this.typeUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeUserDto: UpdateRoleDto) {
    return this.typeUserService.update(+id, updateTypeUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeUserService.remove(+id);
  }
}
