import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users', { database: 'meduzzen' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: 'true',
  })
  isActive: boolean;
}
