import { Role } from 'src/user/types/userRole.type';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const authenticated = await super.canActivate(context);

    if (!authenticated) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(), // 현재 핸들러 메서드에서 설정한 역할 정보
      context.getClass(), // 현재 컨트롤러에서 설정한 역할 정보
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
