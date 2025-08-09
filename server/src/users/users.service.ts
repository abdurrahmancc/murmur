// src/user/user.service.ts

import { Injectable, BadRequestException, Req, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from '../entities/user/user';
import { JwtService } from '@nestjs/jwt';
import { Follow } from 'src/entities/follow/followo';
import cloudinary from 'src/cloudinary/cloudinary.config';
import { ImageService } from 'src/common/services/image.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,

    @InjectRepository(Follow)
    private followRepo: Repository<Follow>,

    private readonly imageService: ImageService,
  ) { }


  async getSuggestedUsers(currentUserId: string): Promise<User[]> {
    const followings = await this.followRepo.find({
      where: { follower: { id: currentUserId } },
      relations: ['following'],
    });

    const followingIds = followings.map(f => f.following.id);

    const suggestions = await this.userRepo.find({
      where: {
        id: Not(In([currentUserId, ...followingIds])),
      },
      take: 5,
      select: ['id', 'firstName', 'lastName', 'username', 'avatarUrl'],
    });

    return suggestions;
  }

  async getLoginUser(userId: string): Promise<User> {

    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'firstName', 'lastName', 'username', 'avatarUrl', 'coverPhotoUrl', 'bio', 'phoneNumber', 'createdAt', 'updatedAt'],
    });

    return user;
  }

    async getUserByUsername(username: string): Promise<User> {

    const user = await this.userRepo.findOne({
      where: { username: username },
      select: ['id', 'firstName', 'lastName', 'username', 'avatarUrl', 'coverPhotoUrl', 'bio', 'phoneNumber', 'createdAt', 'updatedAt'],
    });

    return user;
  }

  //relations = ["following", "followers", "murmurs", "likes"]
  async getLoginUserDetails( userId: string, relations: string[] = []): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations });
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }




  async updateProfile( id: string, data: any,avatarFile?: Express.Multer.File, coverFile?: Express.Multer.File): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (avatarFile) {
      if (user.avatarUrl) {
        await this.imageService.deleteImage(user.avatarUrl);
      }
      try {
        const avatarUrl = await this.imageService.uploadImage(avatarFile);
        user.avatarUrl = avatarUrl;
      } catch (error) {
        throw new BadRequestException('Avatar upload failed: ' + error.message);
      }
    }

    if (coverFile) {
      if (user.coverPhotoUrl) {
        await this.imageService.deleteImage(user.coverPhotoUrl);
      }
      try {
        const coverUrl = await this.imageService.uploadImage(coverFile);
        user.coverPhotoUrl = coverUrl;
      } catch (error) {
        throw new BadRequestException('Cover photo upload failed: ' + error.message);
      }
    }

    // Update only provided text fields
    if (data.firstName !== undefined) user.firstName = data.firstName;
    if (data.lastName !== undefined) user.lastName = data.lastName;
    if (data.bio !== undefined) user.bio = data.bio;

    return await this.userRepo.save(user);
  }



}

