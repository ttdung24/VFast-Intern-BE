import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { User } from '../users/user.entity';
import { RegisterRequestDto } from './dto/register-request.dto';
import { UserDecorator } from 'src/share/decorators/user.decorator';
import { ITokenResponse } from './auth.interface';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { Public } from 'src/share/decorators/auth.decorator';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserDecorator() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() data: RegisterRequestDto): Promise<User> {
    return this.authService.register(data);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshAccessToken(
    @UserDecorator() user: User,
  ): Promise<ITokenResponse> {
    return this.authService.refreshAccessToken(user);
  }
}
