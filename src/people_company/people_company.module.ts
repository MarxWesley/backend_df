import { Module } from '@nestjs/common';
import { PeopleCompanyService } from './people_company.service';
import { PeopleCompanyController } from './people_company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleCompany } from './entities/people_company.entity';
import { Person } from 'src/people/entities/person.entity';
import { Company } from 'src/companies/entities/company.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { PeopleService } from 'src/people/people.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleCompany, Person, Company])],
  controllers: [PeopleCompanyController],
  providers: [PeopleCompanyService, CompaniesService, PeopleService],
  exports: [PeopleCompanyService],
})
export class PeopleCompanyModule {}