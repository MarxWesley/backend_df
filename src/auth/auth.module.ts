import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt/jwt.strategies';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from './entities/auth-token.entity';
import { PasswordToken } from './entities/password-token.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([AuthToken, PasswordToken]),
    JwtModule.register({
      secret: 'chave-secreta-super-segura',
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule { }