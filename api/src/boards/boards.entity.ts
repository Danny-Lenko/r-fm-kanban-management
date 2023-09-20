import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { ColumnsEntity } from 'src/columns/columns.entity';
import { UserEntity } from 'src/auth/user.entity';

@Entity()
export class BoardsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'New' })
  category: string;

  @OneToMany(() => ColumnsEntity, (column) => column.board, {
    cascade: true, // Allows cascading operations (e.g., insert, update, delete) on related columns
    // eager: true,
  })
  columns: ColumnsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.boards, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
