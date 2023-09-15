import { IsNotEmpty, IsString } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  userNameOrEmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
