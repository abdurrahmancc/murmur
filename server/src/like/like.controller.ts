// src/like/like.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('like')
export class LikeController {
  
  @Get()
  getAllLikes() {
    return 'সব Like দেখাও';
  }

  @Post()
  createLike(@Body() body: any) {
    return {
      message: 'নতুন Like তৈরি হয়েছে',
      data: body,
    };
  }

  @Get(':id')
  getLikeById(@Param('id') id: string) {
    return `এই Like-এর ID: ${id}`;
  }
}
