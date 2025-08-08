import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { MurmursService } from './murmurs.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from 'src/common/dtos/api-response.dto';
import { CreateLikeDto } from './dto/create.like.dto';

@Controller('/api')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/murmur/create')
  async createMurmur(@Body() dto: CreateMurmurDto, @Req() req) {
    const userId = req?.user?.userId;
    try {
      const created = await this.murmursService.createMurmur(userId, dto);
      return ApiResponse.SuccessResponse(created, 201, 'Murmur created successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to create murmur'], 400, error.message);
    }
  }

  @Get('/murmurs')
  async getAllMurmurs( @Query('page') page: string = '1',  @Query('pageSize') pageSize: string = '10',) {
    try {
      const pageNumber = parseInt(page, 10) || 1;
      const size = parseInt(pageSize, 10) || 10;


      const murmurs = await this.murmursService.getMurmurs(pageNumber, size);

      return ApiResponse.SuccessResponse(murmurs, 200, 'Murmurs fetched successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to fetch murmurs'], 500, error.message);
    }
  }

  //  Like a murmur
  @UseGuards(JwtAuthGuard)
  @Patch('/murmur/like/:murmurId')
  async likeMurmur(@Param('murmurId') murmurId: number, @Req() req) {
    const userId = req.user?.uid;
    try {
      const like = await this.murmursService.likeMurmur({userId, murmurId});
      return ApiResponse.SuccessResponse(like, 200, 'Murmur liked successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to like murmur'], 400, error.message);
    }
  }

  //  Unlike a murmur
  @UseGuards(JwtAuthGuard)
  @Delete('/murmur/unlike/:murmurId')
  async unlikeMurmur(@Param('murmurId') murmurId: number, @Req() req) {
    const userId = req.user?.userId;
    try {
      const result = await this.murmursService.unlikeMurmur({userId, murmurId});
      return ApiResponse.SuccessResponse(result, 200, 'Murmur unliked successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to unlike murmur'], 400, error.message);
    }
  }

  //  Count likes for a murmur
  @Get('/murmur/:id/likes')
  async countLikes(@Param('id') murmurId: string) {
    try {
      const count = await this.murmursService.countLikes(+murmurId);
      return ApiResponse.SuccessResponse({ count }, 200, 'Likes counted successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to count likes'], 400, error.message);
    }
  }

  @Delete('murmur/:murmurId')
  async deleteMurmur(@Param('murmurId') murmurId: number, @Req() req) {
    try {
      const userId = req.user?.uid;
      const deleted = await this.murmursService.deleteMurmur(murmurId, userId);
      if (!deleted) {
        return ApiResponse.ErrorResponse(['Murmur not found or not authorized'], 404);
      }
      return ApiResponse.SuccessResponse(null, 200, 'Murmur deleted successfully');
    } catch (error) {
      return ApiResponse.ErrorResponse(['Failed to delete murmur'], 400, error.message);
    }
  }
}