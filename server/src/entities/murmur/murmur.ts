import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user';
import { Like } from '../like/like';


@Entity()
export class Murmur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.murmurs, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Like, (like) => like.murmur)
  likes: Like[];
}
