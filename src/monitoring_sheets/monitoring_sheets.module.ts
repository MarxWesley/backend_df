import { Module } from '@nestjs/common';
import { MonitoringSheetsService } from './monitoring_sheets.service';
import { MonitoringSheetsController } from './monitoring_sheets.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringSheet } from './entities/monitoring_sheet.entity';
import { PeopleCompany } from 'src/people_company/entities/people_company.entity';
import { PeopleCompanyService } from 'src/people_company/people_company.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringSheet, PeopleCompany])],
  controllers: [MonitoringSheetsController],
  providers: [MonitoringSheetsService, PeopleCompanyService],
})
export class MonitoringSheetsModule {}