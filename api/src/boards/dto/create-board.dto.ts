import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBoardDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  category: string;

  @ValidateNested({ each: true })
  @Type(() => ColumnDto) // Specify the type to transform to
  columns: ColumnDto[];
}

class ColumnDto {
  @IsNotEmpty()
  name: string;
}
