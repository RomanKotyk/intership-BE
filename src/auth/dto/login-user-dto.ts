import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  readonly password: string;
}
