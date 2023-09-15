import { Controller, Post, Body } from '@nestjs/common';

import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { UserEntity } from './user.entity';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<UserEntity> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<string> {
    return this.authService.singIn(signInCredentialsDto);
  }
}
