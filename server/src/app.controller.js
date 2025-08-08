import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Murmur } from './entities/murmur.entity';
import { Like } from './entities/like.entity';
import { Follow } from './entities/follow.entity';
import { UsersModule } from './users/users.module';
import { MurmurModule } from './murmur/murmur.module';
import { LikeModule } from './like/like.module';

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
        MurmurModule,
        LikeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
