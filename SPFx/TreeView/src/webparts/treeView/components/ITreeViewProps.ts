import { ITreeItem } from './ITreeItem';
import { ITreeItemActions } from './ITreeItemActions';

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

  treeItemActions?: ITreeItemActions;

  /**
   * Callback function called after a item is expanded / collapsed
   * @argument item The expanded / collapsed item
   * @argument isExpanded The status of item (expanded / collapsed)
   */
  onExpandCollapse?: (item: ITreeItem, isExpanded: boolean) => void;

  /**
   * Callback function called after a item is selected
   * @argument item The selected item
   * @argument isSelected The status of item selection
   */
  onSelect?: (item: ITreeItem, isSelected: boolean) => void;

  /**
   * Customize how items are rendered
   * @argument item The tree item
   */
  onRenderItem?: (item: ITreeItem) => JSX.Element;  
}
