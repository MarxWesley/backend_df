import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decoretor';

@Controller('role')
export class RoleController {
  constructor(private readonly typeUserService: RoleService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('acess-token')
  @Roles(1)
  create(@Body() createTypeUserDto: CreateRoleDto) {
    return this.typeUserService.create(createTypeUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'returns all roles' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('acess-token')
  @Roles(1)
  findAll() {
    return this.typeUserService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'returns a role by id' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('acess-token')
  @ApiParam({ name: 'id', description: 'The id of the role', required: true, example: 1 })
  @Roles(1)
  findOne(@Param('id') id: string) {
    return this.typeUserService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('acess-token')
  @ApiOperation({ summary: 'Update a role by id' })
  @ApiParam({ name: 'id', description: 'The id of the role', required: true, example: 1 })
  @Roles(1)
  update(@Param('id') id: string, @Body() updateTypeUserDto: UpdateRoleDto) {
    return this.typeUserService.update(+id, updateTypeUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('acess-token')
  @ApiOperation({ summary: 'Delete a role by id' })
  @ApiParam({ name: 'id', description: 'The id of the role', required: true, example: 1 })
  @Roles(1)
  remove(@Param('id') id: string) {
    return this.typeUserService.remove(+id);
  }
}
