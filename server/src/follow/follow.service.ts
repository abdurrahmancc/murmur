import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow/followo';
import { User } from 'src/entities/user/user';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(Follow)
        private followRepo: Repository<Follow>,
    ) { }




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


    async getFollowers(userId: string): Promise<User[]> {
        const user = await this.userRepo.findOne({ where: [{ id: userId }, { username: userId }] });
        const followers = await this.followRepo.find({ where: [{ following: { id: user?.id } }], relations: ['follower'] });
        return followers.map(f => f.follower);
    }

    async getFollowing(userId: string): Promise<User[]> {
        const user = await this.userRepo.findOne({ where: [{ id: userId }, { username: userId }] });
        const following = await this.followRepo.find({
            where: [{ follower: { id: user.id } }],
            relations: ['following'],
        });
        return following.map(f => f.following);
    }

    async getFollowingCount(userId: string): Promise<number> {
        const user = await this.userRepo.findOne({ where: [{ id: userId }, { username: userId }] });
        const count = await this.followRepo.count({
            where: [{ follower: { id: user.id } }],
        });
        return count;
    }

    async getFollowersCount(userId: string): Promise<number> {
        const user = await this.userRepo.findOne({ where: [{ id: userId }, { username: userId }] });
        const count = await this.followRepo.count({
            where: [{ following: { id: user.id } }],
        });
        return count;
    }

}
