import {
  IsString,
  Length,
  IsNotEmpty,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  firstName: string;
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  lastName: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  readonly passsword: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsBoolean()
  isActive: boolean;
}
