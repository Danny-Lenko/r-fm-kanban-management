export interface Board {
  id: string;
  name: string;
  category: string;
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
}
