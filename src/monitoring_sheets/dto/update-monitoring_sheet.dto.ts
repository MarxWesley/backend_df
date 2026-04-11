import { PartialType } from '@nestjs/swagger';
import { CreateMonitoringSheetDto } from './create-monitoring_sheet.dto';

export class UpdateMonitoringSheetDto extends PartialType(CreateMonitoringSheetDto) {}
