import { Module } from '@nestjs/common';
import { MonitoringSheetsService } from './monitoring_sheets.service';
import { MonitoringSheetsController } from './monitoring_sheets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringSheet } from './entities/monitoring_sheet.entity';
import { PeopleCompany } from 'src/people_company/entities/people_company.entity';
import { PeopleCompanyModule } from '@/people_company/people_company.module';
import { CompaniesModule } from '@/companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringSheet, PeopleCompany]),
    PeopleCompanyModule,
    CompaniesModule
  ],
  controllers: [MonitoringSheetsController],
  providers: [MonitoringSheetsService],
})
export class MonitoringSheetsModule { }