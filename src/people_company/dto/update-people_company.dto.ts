import { PartialType } from '@nestjs/swagger';
import { CreatePeopleCompanyDto } from './create-people_company.dto';

export class UpdatePeopleCompanyDto extends PartialType(CreatePeopleCompanyDto) {}
