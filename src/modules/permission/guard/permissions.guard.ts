import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS } from 'src/share/decorators/permissons.decorator';
import { RequestWithUser } from 'src/share/types/request.type';

@Injectable()
export class PerrmisionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions: string[] = this.reflector.getAllAndOverride(
      PERMISSIONS,
      [context.getHandler(), context.getClass()],
    );
    const req: RequestWithUser = context.switchToHttp().getRequest();
    if (!permissions) return true;

    return permissions?.every((permission) =>
      req.user.roles.some((role) =>
        role.permissions.some((per) => per.code.includes(permission)),
      ),
    );
  }
}
