import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { TasksEntity } from 'src/tasks/tasks.entity';

@Entity()
export class SubtasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => TasksEntity, (task) => task.subtasks, {
    onDelete: 'CASCADE',
  })
  task: TasksEntity;
}
