import { Module } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { MurmursController } from './murmurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Murmur } from 'src/entities/murmur/murmur';
import { User } from 'src/entities/user/user';
import { Like } from 'src/entities/like/like';


@Module({
   imports: [TypeOrmModule.forFeature([Murmur, User, Like])],
  controllers: [MurmursController],
  providers: [MurmursService],
})
export class MurmursModule {}
