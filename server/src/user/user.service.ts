// src/user/user.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '../entities/user/user';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<object> {
    const username = dto.email.split('@')[0];
    const newUser = this.userRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      username: username,
    });

     await this.userRepo.save(newUser);

     const payload = { uid: newUser.id, email: newUser.email, username: newUser.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      token: accessToken,
    };
  }

  async login(dto: LoginUserDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });

    if (!user || user.password !== dto.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { uid: user.id, email: user.email, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      token: accessToken,
    };
  }
}

