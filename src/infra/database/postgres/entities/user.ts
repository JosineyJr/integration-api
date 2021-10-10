import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '@/domain/models/user';
import { PgRole } from './role';

@Entity({ name: 'tb_users' })
export class PgUser implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'role_id' })
  roleId!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => PgRole, role => role.user, { eager: true })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: PgRole;
}
