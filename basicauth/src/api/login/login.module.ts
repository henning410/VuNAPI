import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
