
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'f9533a450ebdd37214f55fa0e8506696f7e69fd9f2812f6f9d4f0f1d8d9dba45',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
