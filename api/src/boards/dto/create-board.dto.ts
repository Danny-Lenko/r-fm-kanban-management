export class CreateBoardDto {
  name: string;
  columns: {
    name: string;
  }[];
}
