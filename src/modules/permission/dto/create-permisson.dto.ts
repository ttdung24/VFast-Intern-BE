import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissonDto {
  @ApiProperty({
    description: 'code',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'module',
  })
  @IsString()
  @IsNotEmpty()
  module: string;
}
