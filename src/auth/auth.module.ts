import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/users/user.repository';

@Module({
  controllers: [AuthController],
  providers: [UserService, AuthService, UserRepository],
})
export class AuthModule {}
