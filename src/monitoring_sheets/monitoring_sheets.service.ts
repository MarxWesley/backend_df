import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringSheetDto } from './dto/create-monitoring_sheet.dto';
import { UpdateMonitoringSheetDto } from './dto/update-monitoring_sheet.dto';
import { MonitoringSheet } from './entities/monitoring_sheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleCompanyService } from 'src/people_company/people_company.service';

@Injectable()
export class MonitoringSheetsService {
  constructor(
    @InjectRepository(MonitoringSheet)
    private monitoringSheetRepository: Repository<MonitoringSheet>,
    private peopleCompanyService: PeopleCompanyService,
  ) { }

  async create(createDto: CreateMonitoringSheetDto) {
    // Valida se o vínculo existe
    await this.peopleCompanyService.findOne(createDto.people_company_id);

    const sheet = this.monitoringSheetRepository.create(createDto);
    return await this.monitoringSheetRepository.save(sheet);
  }

  async findAll() {
    return await this.monitoringSheetRepository.find({
      relations: ['people_company', 'people_company.empresa'],
      order: { data_visita: 'DESC' },
    });
  }

  async findOne(id: number) {
    const sheet = await this.monitoringSheetRepository.findOne({
      where: { id },
      relations: ['people_company', 'people_company.empresa'],
    });

    if (!sheet) {
      throw new NotFoundException(`Ficha de monitoramento com ID ${id} não encontrada.`);
    }

    return sheet;
  }

  async findByPeopleCompany(people_company_id: number) {
    // Valida se o vínculo existe
    await this.peopleCompanyService.findOne(people_company_id);

    const sheets = await this.monitoringSheetRepository.find({
      where: { people_company: { id: people_company_id } },
      relations: ['people_company', 'people_company.empresa'],
      order: { data_visita: 'DESC' },
    });

    if (sheets.length === 0) {
      throw new NotFoundException(`Nenhuma ficha de monitoramento encontrada para o vínculo ID ${people_company_id}.`);
    }

    return sheets;
  }

  async update(id: number, updateDto: UpdateMonitoringSheetDto) {
    const sheet = await this.findOne(id);

    // Valida o vínculo se foi enviado
    if (updateDto.people_company_id) {
      await this.peopleCompanyService.findOne(updateDto.people_company_id);
    }

    const updated = this.monitoringSheetRepository.merge(sheet, updateDto);
    return await this.monitoringSheetRepository.save(updated);
  }

  async remove(id: number) {
    const sheet = await this.findOne(id);
    return await this.monitoringSheetRepository.remove(sheet);
  }
}
