import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user';
import { Murmur } from '../murmur/murmur';


@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Murmur, (murmur) => murmur.likes, { onDelete: 'CASCADE' })
  murmur: Murmur;

  @CreateDateColumn()
  created_at: Date;
}
