import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { ColumnsEntity } from 'src/columns/columns.entity';
import { SubtasksEntity } from 'src/subtasks/subtasks.entity';

@Entity()
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => ColumnsEntity, (column) => column.tasks, {
    onDelete: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  column: ColumnsEntity;

  @OneToMany(() => SubtasksEntity, (subtask) => subtask.task, {
    cascade: true,
  })
  subtasks: SubtasksEntity[];
}
