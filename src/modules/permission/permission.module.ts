import { Module } from '@nestjs/common';
import { PermissonService } from './permission.service';
import { PermissonController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permisson } from './permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permisson])],
  controllers: [PermissonController],
  providers: [PermissonService],
  exports: [PermissonService],
})
export class PermissonModule {}
