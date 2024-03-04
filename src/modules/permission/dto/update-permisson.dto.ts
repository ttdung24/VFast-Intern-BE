import { PartialType } from '@nestjs/swagger';
import { CreatePermissonDto } from './create-permisson.dto';

export class UpdatePermissonDto extends PartialType(CreatePermissonDto) {}
