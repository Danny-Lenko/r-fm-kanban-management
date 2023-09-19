import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { BoardsEntity } from 'src/boards/boards.entity';
import { TasksEntity } from 'src/tasks/tasks.entity';

@Entity()
export class ColumnsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '#E4EBFA' })
  color: string;

  @ManyToOne(() => BoardsEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  board: BoardsEntity;

  @OneToMany(() => TasksEntity, (task) => task.column, {
    cascade: true,
    eager: true,
  })
  tasks: TasksEntity[];
}
