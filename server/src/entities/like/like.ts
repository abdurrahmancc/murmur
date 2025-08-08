import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from '../user/user';
import { Murmur } from '../murmur/murmur';


@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string; 

  @Column()
  murmurId: number; 

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Murmur, (murmur) => murmur.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'murmurId' })
  murmur: Murmur;

  @CreateDateColumn()
  created_at: Date;
}

