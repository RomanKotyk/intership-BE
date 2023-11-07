import { UserRepository } from 'src/users/user.repository';
import { HttpStatus, Injectable, NotFoundException, HttpException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async createUser(createUserDto: CreateUserDto): Promise<IResponse<User>> {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password);
      return this.userService.createUser(createUserDto);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new Error('Server error');
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
