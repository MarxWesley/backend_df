import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeopleCompanyService } from './people_company.service';
import { CreatePeopleCompanyDto } from './dto/create-people_company.dto';
import { UpdatePeopleCompanyDto } from './dto/update-people_company.dto';

@Controller('people-company')
export class PeopleCompanyController {
  constructor(private readonly peopleCompanyService: PeopleCompanyService) {}

  @Post()
  create(@Body() createPeopleCompanyDto: CreatePeopleCompanyDto) {
    return this.peopleCompanyService.create(createPeopleCompanyDto);
  }

  @Get()
  findAll() {
    return this.peopleCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleCompanyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeopleCompanyDto: UpdatePeopleCompanyDto) {
    return this.peopleCompanyService.update(+id, updatePeopleCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleCompanyService.remove(+id);
  }
}
