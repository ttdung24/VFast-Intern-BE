import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/modules/role/role.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
  })
  @IsStrongPassword()
  password: string;

  @ApiPropertyOptional({
    description: 'name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'phone',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'salt',
  })
  @IsOptional()
  @IsString()
  salt: string;

  @ApiPropertyOptional({
    description: 'refresh_token',
  })
  @IsOptional()
  @IsString()
  refresh_token?: string;

  @ApiPropertyOptional({
    description: 'age',
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'roles',
  })
  @IsArray()
  roles: Role[];
}
