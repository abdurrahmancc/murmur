
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'f9533a450ebdd37214f55fa0e8506696f7e69fd9f2812f6f9d4f0f1d8d9dba45',
    });
  }

  async validate(payload: any) {
    return { uid: payload.uid, email: payload.email, username:payload.username, firstName: payload.firstName, lastName: payload.lastName };
  }
}
