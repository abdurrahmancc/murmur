
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Get('suggestions')
  async suggestUsers(@Req() req) {
    return this.userService.getSuggestedUsers(req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Post('follow/:id')
  async followUser(@Param('id') targetUserId: string, @Req() req) {
    return this.userService.followUser(req.user.uid, targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unfollow/:id')
  async unfollowUser(@Param('id') targetUserId: string, @Req() req) {
    return this.userService.unfollowUser(req.user.uid, targetUserId);
  }

}
