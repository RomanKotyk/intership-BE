import { User } from './user.entity';
import { HttpStatus, Injectable, NotFoundException, HttpException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IResponse } from 'src/interface/response.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';
import { IError } from 'src/interface/error.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<IResponse<User[]>> {
    try {
      const users = await this.userRepository.getUsers();
      return {
        status_code: HttpStatus.OK,
        detail: users,
        result: 'Fetched all users',
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: number): Promise<IResponse<string>> {
    try {
      this.logger.log(`Delete user id: ${id}`);
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        this.logger.error(`User id: ${id} not found`);
        throw new HttpException(`User id: ${id} not found`, HttpStatus.NOT_FOUND);
      }
      await this.userRepository.deleteUser(user);
      return {
        status_code: HttpStatus.OK,
        detail: `User id: ${id} was deleted`,
        result: 'User was deleted',
      };
    } catch (err) {
      throw err;
    }
  }

  async getUserById(id: number): Promise<IResponse<User>> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        this.logger.error(`User id: ${id} not found`);
        throw new HttpException(`User id: ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return {
        status_code: HttpStatus.OK,
        detail: user,
        result: `User id: ${id}`,
      };
    } catch (err) {
      throw err;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<IResponse<User>> {
    try {
      this.logger.log(`Save new user ${createUserDto.email}`);
      const user = await this.userRepository.getUserByEmail(createUserDto.email);
      if (user) {
        this.logger.error(`User with email ${createUserDto.email} already exists`);
        throw new HttpException(`User with email ${createUserDto.email} already exists`, HttpStatus.BAD_REQUEST);
      }
      createUserDto.password = await this.hashPassword(createUserDto.password);
      const newUser = await this.userRepository.save(createUserDto);
      return {
        status_code: HttpStatus.OK,
        detail: newUser,
        result: `User was created`,
      };
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<IResponse<User>> {
    try {
      this.logger.log(`Update user id: ${id}`);
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        this.logger.error(`User id: ${id} not found`);
        throw new NotFoundException(`User id: ${id} not found`);
      }

      const updatedUser = await this.userRepository.updateUser(updateUserDto, user);

      return {
        status_code: HttpStatus.OK,
        detail: updatedUser,
        result: `User id:${id} was updated`,
      };
    } catch (err) {
      throw err;
    }
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
