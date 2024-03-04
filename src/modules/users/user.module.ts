import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleModule } from '../role/role.module';
import { PermissonModule } from '../permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, PermissonModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
