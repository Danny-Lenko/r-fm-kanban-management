import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthService)
    private userRepository: AuthService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { userNameOrEmail } = payload;

    const isEmail = userNameOrEmail.includes('@');

    const user: UserEntity = isEmail
      ? await this.userRepository.findOneBy({ userEmail: userNameOrEmail })
      : await this.userRepository.findOneBy({ userName: userNameOrEmail });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
