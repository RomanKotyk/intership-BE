import {
  IsString,
  Length,
  IsNotEmpty,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 20)
  firstName: string;
  @IsString()
  @Length(2, 20)
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsBoolean()
  isActive: boolean;
}
