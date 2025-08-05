import { Module } from '@nestjs/common';
import { MurmurController } from './murmur.controller';
import { MurmurService } from './murmur.service';


@Module({
  controllers: [MurmurController],
  providers: [MurmurService]
})
export class MurmurModule {}
