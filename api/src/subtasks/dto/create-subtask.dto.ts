import { IsNotEmpty } from 'class-validator';
import { TasksEntity } from 'src/tasks/tasks.entity';

export class CreateSubtaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  task: TasksEntity;
}
