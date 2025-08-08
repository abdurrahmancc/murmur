// src/user/user.service.ts

import { Injectable, BadRequestException, Req, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from '../entities/user/user';
import { JwtService } from '@nestjs/jwt';
import { Follow } from 'src/entities/follow/followo';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,

    @InjectRepository(Follow)
    private followRepo: Repository<Follow>,
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

  async followUser(currentUserId: string, targetUserId: string): Promise<{ message: string, success: boolean }> {
    if (currentUserId === targetUserId) {
      throw new BadRequestException("You cannot follow yourself.");
    }

    const existingFollow = await this.followRepo.findOne({
      where: {
        follower: { id: currentUserId },
        following: { id: targetUserId },
      },
    });

    if (existingFollow) {
      throw new BadRequestException("You are already following this user.");
    }

    const follower = await this.userRepo.findOneBy({ id: currentUserId });
    const following = await this.userRepo.findOneBy({ id: targetUserId });

    if (!follower || !following) {
      throw new NotFoundException("User not found.");
    }

    const follow = this.followRepo.create({ follower, following });
    await this.followRepo.save(follow);

    return { success: true, message: `You are now following ${following.username}` };
  }

  async unfollowUser(currentUserId: string, targetUserId: string): Promise<{ message: string }> {
    const follow = await this.followRepo.findOne({
      where: {
        follower: { id: currentUserId },
        following: { id: targetUserId },
      },
    });

    if (!follow) {
      throw new BadRequestException("You are not following this user.");
    }

    await this.followRepo.remove(follow);

    return { message: "Unfollowed successfully." };
  }

}

