import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new Company' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Get a Company by Name or CNPJ' })
  @ApiQuery({ name: 'search', required: true, example: 'Nestle ou 18665979000182' })
  findByNameOrCnpj(@Query('search') search: string) {
    return this.companiesService.findByNameOrCnpj(search);
  }

  @Get()
  @ApiOperation({ summary: 'List all Companies' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Company by id' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Company by id' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Company by id' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
