import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Realizar login' })
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto.email, createAuthDto.password);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // Aqui você pode adicionar um guard de autenticação, como JwtAuthGuard
  @ApiBearerAuth('access-token') // Indica que este endpoint requer autenticação
  async getProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.userId); // O usuário autenticado estará disponível em req.user
    
    return user;
  }
}