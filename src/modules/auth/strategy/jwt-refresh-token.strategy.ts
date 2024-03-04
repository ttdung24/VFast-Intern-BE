import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { refresh_token_public_key } from 'src/constraints/jwt.constraint';
import { TokenPayload } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refresh_token_public_key,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    return this.authService.getUserIfRefreshtokenMatched(
      payload.id,
      req.headers.authorization.split('Bearer ')[1],
    );
  }
}
