import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonitoringSheetsService } from './monitoring_sheets.service';
import { CreateMonitoringSheetDto } from './dto/create-monitoring_sheet.dto';
import { UpdateMonitoringSheetDto } from './dto/update-monitoring_sheet.dto';

@Controller('monitoring-sheets')
export class MonitoringSheetsController {
  constructor(private readonly monitoringSheetsService: MonitoringSheetsService) {}

  @Post()
  create(@Body() createMonitoringSheetDto: CreateMonitoringSheetDto) {
    return this.monitoringSheetsService.create(createMonitoringSheetDto);
  }

  @Get()
  findAll() {
    return this.monitoringSheetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoringSheetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonitoringSheetDto: UpdateMonitoringSheetDto) {
    return this.monitoringSheetsService.update(+id, updateMonitoringSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitoringSheetsService.remove(+id);
  }
}
