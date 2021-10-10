import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PgUser } from './user';

@Entity({ name: 'tb_roles' })
export class PgRole {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => PgUser, user => user.role)
  user!: Array<PgUser>;
}
