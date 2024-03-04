import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/share/decorators/roles.decorator';
import { RequestWithUser } from 'src/share/types/request.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.getAllAndOverride(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req: RequestWithUser = context.switchToHttp().getRequest();
    return req.user.roles.some((userRole) =>
      roles.some((role) => role === userRole.name),
    );
  }
}
