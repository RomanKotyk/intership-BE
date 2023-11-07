import { Controller, UseFilters, Body, Post } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { IResponse } from 'src/interface/response.interface';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<IResponse<User>> {
    return await this.authService.createUser(createUserDto);
  }
}
