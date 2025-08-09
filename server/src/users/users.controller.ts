
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/users/suggestions')
  async suggestUsers(@Req() req) {
    return this.userService.getSuggestedUsers(req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/me')
  async getMe(@Req() req) {
    try {
      const user = await this.userService.getLoginUser(req.user.uid);
      return ApiResponse.SuccessResponse(user, 200, 'fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch user'], 400, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:username')
  async getUserByUsername(@Param('username') username: string) {
    try {
      const user = await this.userService.getUserByUsername(username);
      return ApiResponse.SuccessResponse(user, 200, 'fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch user'], 400, error.message);
    }
  }

  
  @UseGuards(JwtAuthGuard)
  @Post('/user/details')
  async getUserDetails(@Body() body: any, @Req() req) {
    try {
      const relations = body.relations ?? []
      const user = await this.userService.getLoginUserDetails(req.user.uid, relations);
      return ApiResponse.SuccessResponse(user, 200, 'fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch user'], 400, error.message);
    }
  }


  @UseGuards(JwtAuthGuard)
  @Put('user/update/:id')
  @UseInterceptors(FileFieldsInterceptor([ { name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 },]))
  async updateProfile(@Param('id') id: string,@Body() body: any, @UploadedFiles() files: { avatar?: Express.Multer.File[]; cover?: Express.Multer.File[] }, @Req() req,) {
    try {
      const avatarFile = files?.avatar?.[0];
      const coverFile = files?.cover?.[0];
      const updatedUser = await this.userService.updateProfile(id, body, avatarFile, coverFile);
      return ApiResponse.SuccessResponse(updatedUser, 200, 'Profile updated successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to update profile'], 400, error.message);
    }
  }


}
