/**
 * Tree Item
 */
export interface ITreeItem {
    Id: string;
    Name: string;
    Description?: string;
    IsRoot?: boolean;
    PathDepth?: number;
    ParentId?: string;
    children?: ITreeItem[]
  }