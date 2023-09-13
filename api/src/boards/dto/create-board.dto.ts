export class CreateBoardDto {
  name: string;
  category?: string;
  columns: {
    name: string;
  }[];
}
