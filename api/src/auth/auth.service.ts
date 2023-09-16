import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from './user.entity';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService extends Repository<UserEntity> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: SignUpCredentialsDto): Promise<UserEntity> {
    const { userName, userEmail, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      userName,
      userEmail,
      password: hashedPassword,
    });

    try {
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async singIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userNameOrEmail, password } = signInCredentialsDto;

    const isEmail = userNameOrEmail.includes('@');

    const user = isEmail
      ? await this.findOneBy({ userEmail: userNameOrEmail })
      : await this.findOneBy({ userName: userNameOrEmail });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { userNameOrEmail };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    }
    if (!user) {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
