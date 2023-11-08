import { User } from './user.entity';
import { HttpStatus, Injectable, NotFoundException, HttpException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IResponse } from 'src/interface/response.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

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
      throw new HttpException({ err }, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number): Promise<IResponse<string>> {
    try {
      this.logger.log(`Delete user id: ${id}`);
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        this.logger.error(`User id: ${id} not found`);
        throw new NotFoundException(`User id: ${id} not found`);
      }
      await this.userRepository.deleteUser(user);
      return {
        status_code: HttpStatus.OK,
        detail: `User id: ${id} was deleted`,
        result: 'User was deleted',
      };
    } catch (err) {
      throw new HttpException({ err }, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: number): Promise<IResponse<User>> {
    try {
      const user = await this.userRepository.getUserById(id);
      console.log(user)
      if (!user) {
        this.logger.error(`User id: ${id} not found`);
        throw new NotFoundException(`User id: ${id} not found`);
      }
      return {
        status_code: HttpStatus.OK,
        detail: user,
        result: `User id: ${id}`,
      };
    } catch (err) {
      throw new HttpException({ err }, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
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
      const newUser = await this.userRepository.save(createUserDto);
      return {
        status_code: HttpStatus.OK,
        detail: newUser,
        result: `User was created`,
      };
    } catch (err) {
      throw new HttpException({ err }, err.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException({ err }, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
