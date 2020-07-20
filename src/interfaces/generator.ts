export interface TableField {
  id: number;
  name: string;
  type: string;
  editMode: boolean;
  nullable: boolean;
  unsigned: boolean;
  autoIncrement: boolean;
}

export type TableOperation = "create" | "drop" | "rename" | "modify";
