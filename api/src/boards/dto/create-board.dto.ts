import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ColumnDto {
  @IsNotEmpty()
  name: string;
}

export class CreateBoardDto {
  @IsNotEmpty()
  name: string;

  category?: string;

  @ValidateNested({ each: true })
  @Type(() => ColumnDto) // Specify the type to transform to
  columns: ColumnDto[];
}
