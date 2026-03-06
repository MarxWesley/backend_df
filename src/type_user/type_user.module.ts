import { Module } from '@nestjs/common';
import { TypeUserService } from './type_user.service';
import { TypeUserController } from './type_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUser } from './entities/type_user.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUser, User])],
  controllers: [TypeUserController],
  providers: [TypeUserService],
})
export class TypeUserModule {}
