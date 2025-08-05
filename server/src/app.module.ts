// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user/user';
import { UserModule } from './user/user.module';
import { MurmurModule } from './murmur/murmur.module';
import { LikeModule } from './like/like.module';
import { Murmur } from './entities/murmur/murmur';
import { Like } from './entities/like/like';
import { Follow } from './entities/follow/followo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abdurrahman$123',
      database: 'murmur',
      entities: [User, Murmur, Like, Follow], 
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Murmur, Like, Follow]),
    UserModule,
    MurmurModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
