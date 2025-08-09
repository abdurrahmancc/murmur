import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponse } from 'src/common/dtos/api-response.dto';

@Controller('api/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) { }


  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async followUser(@Param('id') targetUserId: string, @Req() req) {
    return this.followService.followUser(req.user.uid, targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async unfollowUser(@Param('id') targetUserId: string, @Req() req) {
    return this.followService.unfollowUser(req.user.uid, targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-followers')
  async getFollowers(@Req() req) {
    try {
      const followers = await this.followService.getFollowers(req.user.uid);
      return ApiResponse.SuccessResponse(followers, 200, 'Followers fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch followers'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-followers/:id')
  async getFollowersById(@Param('id') id: string) {
    try {
      const followers = await this.followService.getFollowers(id);
      return ApiResponse.SuccessResponse(followers, 200, 'Followers fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch followers'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-following')
  async getFollowing(@Req() req) {
    try {
      const following = await this.followService.getFollowing(req.user.uid);
      return ApiResponse.SuccessResponse(following, 200, 'Following fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch following'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-following/:id')
  async getFollowingById(@Param('id') id: string) {
    try {
      const following = await this.followService.getFollowing(id);
      return ApiResponse.SuccessResponse(following, 200, 'Following fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch following'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-following-count')
  async getFollowingCount(@Req() req) {
    try {
      const count = await this.followService.getFollowingCount(req.user.uid);
      return ApiResponse.SuccessResponse(count, 200, 'fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-following-count/:id')
  async getFollowingCountById(@Param('id') id: string) {
    try {
      const count = await this.followService.getFollowingCount(id);
      return ApiResponse.SuccessResponse(count, 200, 'fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-followers-count')
  async getFollowersCount(@Req() req) {
    try {
      const count = await this.followService.getFollowersCount(req.user.uid);
      return ApiResponse.SuccessResponse(count, 200, 'fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-followers-count/:id')
  async getFollowersCountById(@Param('id') id: string) {
    try {
      const count = await this.followService.getFollowersCount(id);
      return ApiResponse.SuccessResponse(count, 200, 'fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch'], 400, error.message);
    }
  }

}
