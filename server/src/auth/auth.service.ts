import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
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
    
         const payload = { uid: newUser.id, email: newUser.email, username: newUser.username, firstName: newUser.firstName, lastName: newUser.lastName };
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
    
        const payload = { uid: user.id, email: user.email, username: user.username , firstName: user.firstName, lastName: user.lastName};
        const accessToken = this.jwtService.sign(payload);
    
        return {
          token: accessToken,
        };
      }
}
