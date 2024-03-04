import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'descripton',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiPropertyOptional({
    description: 'price',
  })
  @IsNumberString()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  price: number = 0;
}
