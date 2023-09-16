import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';
import { UserEntity } from 'src/auth/user.entity';

@Entity()
export class BoardsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'New' })
  category: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    cascade: true, // Allows cascading operations (e.g., insert, update, delete) on related columns
  })
  columns: ColumnEntity[];

  @ManyToOne(() => UserEntity, (user) => user.boards, { eager: false })
  user: UserEntity;
}
