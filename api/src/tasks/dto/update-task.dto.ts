import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  status: string;

  @ValidateNested({ each: true })
  @Type(() => SubtaskDto)
  subtasks: SubtaskDto[];
}

class SubtaskDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  isCompleted: boolean;
}
