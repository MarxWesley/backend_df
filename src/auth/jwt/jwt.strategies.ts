import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'chave-secreta-super-segura',
    });
  }

  async validate(payload: any) {
    console.log('JWT PAYLOAD:', payload); // 👈 agora vai aparecer
    return {
      userId: Number(payload.sub),
      roleId: Number(payload.roleId),
    };
  }
}