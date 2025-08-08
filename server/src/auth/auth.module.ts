
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user/user';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'f9533a450ebdd37214f55fa0e8506696f7e69fd9f2812f6f9d4f0f1d8d9dba45',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
