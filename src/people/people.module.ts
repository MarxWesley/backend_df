import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Role])],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService], // Exporta o serviço para ser usado em outros módulos
})
export class PeopleModule {}
