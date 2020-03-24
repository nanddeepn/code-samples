/**
 * Tree Item
 */
export interface ITreeItem {
  Id: string;
  Name: string;
  Description?: string;
  PathDepth?: number;
  ParentId?: string;
  children?: ITreeItem[];
}