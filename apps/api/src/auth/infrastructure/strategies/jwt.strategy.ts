import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../auth/application/auth.service';
import { AuthJwtPayload } from '../../../auth/domain/types/auth-jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    const userid = payload.sub;
    return this.authService.validateJwtUser(userid);
  }
}

// req.user
