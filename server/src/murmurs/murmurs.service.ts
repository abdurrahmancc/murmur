import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Murmur } from 'src/entities/murmur/murmur';
import { Repository } from 'typeorm';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { User } from 'src/entities/user/user';
import { VisibilityMurmur } from 'src/common/enums/visibility.enum';
import { CreateLikeDto } from './dto/create.like.dto';
import { Like } from 'src/entities/like/like';

@Injectable()
export class MurmursService {
  constructor(
    @InjectRepository(Murmur)
    private murmursRepo: Repository<Murmur>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) { }

  async createMurmur(userId: string, dto: CreateMurmurDto) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const murmur = this.murmursRepo.create({
      text: dto.content,
      visibility: dto.access as VisibilityMurmur,
      user,
    });

    return this.murmursRepo.save(murmur);
  }

  async getMurmurs(page: number = 1, pageSize: number = 10) {
    const [items, totalItems] = await this.murmursRepo.findAndCount({
      relations: ['user', 'likes', 'replies'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalItems / pageSize);
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return { items, totalItems, pageNumber: page, pageSize, totalPages, startPage, endPage, };
  }


  async getMyMurmurs(page: number = 1, pageSize: number = 10, userId: string) {
    const [items, totalItems] = await this.murmursRepo.findAndCount({
      where: { user: { id: userId } },
      relations: ['user', 'likes', 'replies'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalItems / pageSize);
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return { items, totalItems, pageNumber: page, pageSize, totalPages, startPage, endPage };
  }


  async likeMurmur(dto): Promise<Like> {
    try {
      const { userId, murmurId } = dto;

      const existing = await this.likeRepository.findOne({
        where: { userId, murmurId },
      });

      if (existing) {
        return await this.likeRepository.remove(existing);
      }

      const user = await this.userRepo.findOne({ where: { id: userId } });
      const murmur = await this.murmursRepo.findOne({ where: { id: murmurId } });

      if (!user || !murmur) {
        throw new Error('User or Murmur not found');
      }

      const like = this.likeRepository.create({ user, murmur });
      return await this.likeRepository.save(like);
    } catch (error) {
      console.log()
      throw new Error(error);
    }
  }

  //  Unlike a Murmur
  async unlikeMurmur(dto: CreateLikeDto): Promise<string> {
    const { userId, murmurId } = dto;

    const existing = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        murmur: { id: murmurId },
      },
    });

    if (!existing) {
      throw new Error('Like not found');
    }

    await this.likeRepository.remove(existing);
    return 'Unliked successfully';
  }

  //  Count Likes
  async countLikes(murmurId: number): Promise<number> {
    return await this.likeRepository.count({
      where: {
        murmur: { id: murmurId },
      },
    });
  }


  async deleteMurmur(murmurId: number, userId: string): Promise<boolean> {
    const murmur = await this.murmursRepo.findOne({ where: { id: murmurId, user: { id: userId } } });
    if (!murmur) return false;

    await this.murmursRepo.delete(murmurId);
    return true;
  }


}