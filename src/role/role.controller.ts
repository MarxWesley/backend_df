import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'returns all roles' })
  findAll() {
    return this.typeUserService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'returns a role by id' })
  @ApiParam({name: 'id', description: 'The id of the role', required: true, example: 1})
  findOne(@Param('id') id: string) {
    return this.typeUserService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role by id' })
  @ApiParam({name: 'id', description: 'The id of the role', required: true, example: 1})
  @ApiQuery({name: 'name', description: 'The name of the role', required: true, example: 'Admin'})
  update(@Param('id') id: string, @Body() updateTypeUserDto: UpdateRoleDto) {
    return this.typeUserService.update(+id, updateTypeUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by id' })
  @ApiParam({name: 'id', description: 'The id of the role', required: true, example: 1})
  remove(@Param('id') id: string) {
    return this.typeUserService.remove(+id);
  }
}
