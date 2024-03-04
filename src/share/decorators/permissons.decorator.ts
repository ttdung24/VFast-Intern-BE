import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS = 'permissons';
export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS, permissions);
