import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EditTaskDto {
  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  status: string;

  @ValidateNested({ each: true })
  @Type(() => SubtaskDto)
  subtasks: SubtaskDto[];
}

class SubtaskDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  isCompleted: boolean;
}
