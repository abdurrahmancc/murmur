import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user';
import { Like } from '../like/like';
import { VisibilityMurmur } from 'src/common/enums/visibility.enum';

@Entity('murmurs')
export class Murmur {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'int' })
  id: number;

  @Column('text', { name: 'Text' })
  text: string;

  @Column('text', { name: 'Images', nullable: true })
  images?: string;

  @Column({ name: 'IsEdited',type: 'tinyint',   default: 0, })
  isEdited: boolean;

  @CreateDateColumn({ name: 'CreatedAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.murmurs, { onDelete: 'CASCADE', })
  user: User;

  @OneToMany(() => Like, (like) => like.murmur)
  likes: Like[];

  @ManyToOne(() => Murmur, (murmur) => murmur.replies, {  nullable: true,  onDelete: 'CASCADE', })
  replyTo?: Murmur;

  @OneToMany(() => Murmur, (murmur) => murmur.replyTo)
  replies?: Murmur[];

  @Column({  name: 'Visibility',   type: 'enum',   enum: VisibilityMurmur,  default: VisibilityMurmur.PUBLIC, })
  visibility: VisibilityMurmur;
}
