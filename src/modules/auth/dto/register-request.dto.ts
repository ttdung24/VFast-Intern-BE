import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
  })
  @IsStrongPassword()
  password: string;
}
