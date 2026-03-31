import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>(
      'roles',
      [
        context.getHandler(),
        context.getClass(),
      ],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    console.log('user', user)
    console.log('requiredRoles', requiredRoles)

    if (!user || !requiredRoles.includes(user.roleId)) {
      throw new ForbiddenException('Sem permissão');
    }

    return true;
  }
}