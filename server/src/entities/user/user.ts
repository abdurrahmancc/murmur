import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Murmur } from '../murmur/murmur';
import { Like } from '../like/like';
import { Follow } from '../follow/followo';

@Entity('users')
export class User {
@PrimaryGeneratedColumn("uuid", { name: "Id" })
  id: string;

  @Column({ name: 'Username', length: 50, unique: true })
  username: string;

  @Column({ name: 'Email', length: 100, unique: true })
  email: string;

  @Column({ name: 'Password', length: 255 })
  password: string;

  @Column({ name: 'FirstName', length: 50, nullable: true })
  firstName: string;

  @Column({ name: 'LastName', length: 50, nullable: true })
  lastName: string;

  @Column({ name: 'AvatarUrl', type: 'text', nullable: true })
  avatarUrl: string;

  @Column({ name: 'CoverPhotoUrl', type: 'text', nullable: true })
  coverPhotoUrl: string;

  @Column({ name: 'Bio', type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'PhoneNumber', length: 20, nullable: true })
  phoneNumber: string;

  @CreateDateColumn({ name: 'CreatedAt', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'datetime' })
  updatedAt: Date;


  @OneToMany(() => Murmur, (murmur) => murmur.user)
  murmurs: Murmur[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];
}
