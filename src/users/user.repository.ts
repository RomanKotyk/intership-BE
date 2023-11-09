import { User } from './user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async getUsers(): Promise<User[]> {
    return this.find();
  }

  async getUserById(userId: number): Promise<User> {
    return this.findOne({ where: { id: Number(userId) } });
  }

  async updateUser(updateUser: UpdateUserDto, user: User): Promise<User> {
    return this.save({
      ...user,
      ...updateUser,
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.save(user);
  }

  async deleteUser(user: User): Promise<void> {
    this.softDelete(user.id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}
