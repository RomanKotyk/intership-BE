import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Auth', { database: 'meduzzen' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    width: 250,
    nullable: false,
  })
  accessToken: string;
  @Column({
    type: 'varchar',
    width: 250,
    nullable: false,
  })
  refreshToken: string;
  @Column({
    nullable: false,
    default: Date.now(),
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @CreateDateColumn({ type: 'timestamp' })
  deleted_at: Date;
  @Column({
    type: 'varchar',
    width: 250,
    nullable: false,
  })
  actionToken: string;
  @Column({
    type: 'int',
  })
  userId: number;
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
