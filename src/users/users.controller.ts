import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { UserService } from './users.service';
import { IResponse } from 'src/interface/response.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { IError } from 'src/interface/error.interface';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<IResponse<User[]>> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: number
  ): Promise<IResponse<User> | IError> {
    try {
      return await this.userService.getUserById(id);
    } catch (err) {
      return {
        status_code: HttpStatus.BAD_REQUEST,
        message: err.message,
        timestamp: new Date().toString()
      };
    }
  }

  @Delete(':id')
  async deleteUserById(
    @Param('id') id: number
  ): Promise<IResponse<string> | IError> {
    try {
      return await this.userService.deleteUser(id);
    } catch (err) {
      return {
        status_code: HttpStatus.BAD_REQUEST,
        message: err.message,
        timestamp: new Date().toString()
      };
    }
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<IResponse<User> | IError> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (err) {
      return {
        status_code: HttpStatus.BAD_REQUEST,
        message: err.message,
        timestamp: new Date().toString()
      };
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IResponse<User> | IError> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (err) {
      return {
        status_code: HttpStatus.BAD_REQUEST,
        message: err.message,
        timestamp: new Date().toString()
      };
    }
  }
}
