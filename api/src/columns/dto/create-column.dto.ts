import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  color?: string;

  board: BoardDto;
}

class BoardDto {
  @IsNotEmpty()
  id: string;
}
