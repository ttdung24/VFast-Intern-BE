import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { access_token_public_key } from 'src/constraints/jwt.constraint';
import { User } from 'src/modules/users/user.entity';
import { UserService } from 'src/modules/users/user.service';
import { TokenPayload } from '../auth.interface';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: access_token_public_key,
    });
  }

  async validate(payload: TokenPayload): Promise<User> {
    return this.userService.getUserWithRoleAndPermisson(payload.id);
  }
}
