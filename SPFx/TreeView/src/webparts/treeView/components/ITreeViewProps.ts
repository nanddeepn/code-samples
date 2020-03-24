import { ITreeItem } from './ITreeItem';

export enum SelectionMode {
  None = 0,
  Single = 1,
  Multiple = 2
}

export interface ITreeViewProps {
  /**
   * The items to render.
   */
  items: ITreeItem[];

  /**
   * Default expand / collapse behavior
   */
  defaultExpanded: boolean;

  /**
   * Specify the item selection mode.
   * By default this is set to none.
   */
  selectionMode: SelectionMode;
  
  /**
   * Callback function called after a item is expanded / collapsed
   * @argument item The expanded / collapsed item
   */
  onExpandCollapse?: (item: ITreeItem, isExpanded: boolean) => void;
}
