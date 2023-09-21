import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { BoardsEntity } from 'src/boards/boards.entity';
import { TasksEntity } from 'src/tasks/tasks.entity';

@Entity()
@Unique(['name', 'board'])
export class ColumnsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '#E4EBFA' })
  color: string;

  @ManyToOne(() => BoardsEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  board: BoardsEntity;

  @OneToMany(() => TasksEntity, (task) => task.column, {
    cascade: true,
    eager: true,
  })
  tasks: TasksEntity[];
}
