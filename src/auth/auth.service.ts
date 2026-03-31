import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthToken } from './entities/auth-token.entity';
import { PasswordToken } from './entities/password-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

    @InjectRepository(AuthToken)
    private authTokenRepository: Repository<AuthToken>,

    @InjectRepository(PasswordToken)
    private passwordTokenRepository: Repository<PasswordToken>,
  ) {}

  async userValidation(createAuthDto: CreateAuthDto) {
    const auth = await this.usersService.findByEmailOrFail(
      createAuthDto.email,
    );

    const isMatch = await bcrypt.compare(
      createAuthDto.password,
      auth.password,
    );

    if (auth && isMatch) {
      const { password, ...result } = auth;
      return result;
    }

    return null;
  }

  // 🔐 LOGIN
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmailOrFail(email);

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    // 🔥 CORREÇÃO: roleId correto
    const accessToken = this.jwtService.sign(
      { sub: user.id, roleId: user.role.id },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    const hashedToken = await bcrypt.hash(refreshToken, 10);

    // 🔥 CORREÇÃO: usar relacionamento
    await this.authTokenRepository.save({
      user: user, // ✅ certo agora
      token: hashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      revoked: false,
    });

    return { accessToken, refreshToken };
  }

  // 🔄 REFRESH TOKEN
  async refreshToken(userId: number, refreshToken: string) {
    const tokens = await this.authTokenRepository.find({
      where: { user: { id: userId }, revoked: false },
      relations: ['user'],
    });

    for (const tokenRecord of tokens) {
      const isValid = await bcrypt.compare(
        refreshToken,
        tokenRecord.token,
      );

      if (isValid) {
        if (tokenRecord.expiresAt < new Date()) {
          throw new UnauthorizedException('Token expirado');
        }

        const newAccessToken = this.jwtService.sign(
          { sub: userId },
          { expiresIn: '15m' },
        );

        return { accessToken: newAccessToken };
      }
    }

    throw new UnauthorizedException('Refresh token inválido');
  }

  // 🔑 RESET REQUEST
  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmailOrFail(email);

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(rawToken, 10);

    await this.passwordTokenRepository.save({
      user: user, // 🔥 corrigido
      token: hashedToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      used: false,
    });

    return rawToken;
  }

  // 🔑 RESET PASSWORD
  async resetPassword(token: string, newPassword: string) {
    const records = await this.passwordTokenRepository.find({
      where: { used: false },
      relations: ['user'],
    });

    let validRecord: PasswordToken | null = null;

    for (const record of records) {
      const isValid = await bcrypt.compare(token, record.token);

      if (isValid) {
        validRecord = record;
        break;
      }
    }

    if (!validRecord || validRecord.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.update(validRecord.user.id, {
      password: hashedPassword,
    });

    validRecord.used = true;
    await this.passwordTokenRepository.save(validRecord);
  }

  // 🚪 LOGOUT
  async logout(userId: number) {
    await this.authTokenRepository.update(
      { user: { id: userId } },
      { revoked: true },
    );
  }
}