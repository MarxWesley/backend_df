import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Person'})
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Get a Person by CPF or Name'})
  @ApiQuery({ name: 'search', required: true, example: 'João ou 12345678900' })
  findByCpf(@Query('search') query: string) {
    return this.peopleService.findByNameOrCpf(query);
  }

  @Get()
  @ApiOperation({ summary: 'List all People'})
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Person by id'})
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Person by id'})
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change the status of a Person by id'})
  alterarStatus(@Param('id') id: string) {
    return this.peopleService.alterarStatus(+id);
  }
}
