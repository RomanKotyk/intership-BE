import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { UserService } from './users.service';
import { IResponse } from 'src/interface/response.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { IError } from 'src/interface/error.interface';
import { User } from './user.entity';
import { HttpExceptionFilter } from 'src/filters/exception.filter';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<IResponse<User[]>> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<IResponse<User> | IError> {
    return await this.userService.getUserById(id);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number): Promise<IResponse<string> | IError> {
    return await this.userService.deleteUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IResponse<User> | IError> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<IResponse<User> | IError> {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
