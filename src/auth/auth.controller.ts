import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Realizar login' })
  async login(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.userValidation(createAuthDto);

    if (!user) throw new UnauthorizedException();

    return this.authService.login(user);
  }
}
