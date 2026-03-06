import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeUser } from 'src/type_user/entities/type_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TypeUser])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}