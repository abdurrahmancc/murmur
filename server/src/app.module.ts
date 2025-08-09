import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user/user';
import { UsersModule } from './users/users.module';
import { LikeModule } from './like/like.module';
import { Murmur } from './entities/murmur/murmur';
import { Like } from './entities/like/like';
import { Follow } from './entities/follow/followo';
import { MurmursModule } from './murmurs/murmurs.module';
import { FollowModule } from './follow/follow.module';


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
    UsersModule,
    LikeModule,
    MurmursModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
