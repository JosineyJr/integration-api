import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PgUser } from './user';

@Entity({ name: 'tb_roles' })
export class PgRole {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @OneToOne(() => PgUser, user => user.role)
  user!: PgUser;
}
