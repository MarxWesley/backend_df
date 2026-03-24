import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    private passwordTokenRepository: Repository<PasswordToken>
  ) { }

  async userValidation(createAuthDto: CreateAuthDto) {
    const auth = await this.usersService.findByEmailOrFail(createAuthDto.email);
    const isMatch = await bcrypt.compare(createAuthDto.password, auth.password);

    if (auth && isMatch) {
      const { password, ...result } = auth;
      return result;
    }

    return null;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmailOrFail(email);

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id, roleId: user.role },
      { expiresIn: '15m' }
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' }
    );

    // 🔐 salva HASH do refresh
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    await this.authTokenRepository.save({
      userId: user.id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: number, refreshToken: string) {
    const tokens = await this.authTokenRepository.find({
      where: { userId, revoked: false },
    });

    const validToken = tokens.find(token =>
      bcrypt.compareSync(refreshToken, token.token)
    );

    if (!validToken) {
      throw new UnauthorizedException();
    }

    const newAccessToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '15m' }
    );

    return { accessToken: newAccessToken };
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmailOrFail(email);

    const token = crypto.randomBytes(32).toString('hex');

    await this.passwordTokenRepository.save({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 min
    });

    // 👉 aqui você envia email
    return token;
  }

  async resetPassword(token: string, newPassword: string) {
    const record = await this.passwordTokenRepository.findOne({
      where: { token, used: false },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.update(record.userId, {
      password: hashedPassword,
    });

    record.used = true;
    await this.passwordTokenRepository.save(record);
  }

  // 🚪 LOGOUT (revoga todos tokens)
  async logout(userId: number) {
    await this.authTokenRepository.update(
      { userId },
      { revoked: true },
    );
  }

}