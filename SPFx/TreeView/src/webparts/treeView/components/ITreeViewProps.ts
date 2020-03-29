import { ITreeItem } from './ITreeItem';
import { ITreeItemActions } from './ITreeItemActions';

/**
 * Selection mode of tree item
 */
export enum SelectionMode {
  None = 0,
  Single = 1,
  Multiple = 2
}

/**
 * TreeView properties interface
 */
export interface ITreeViewProps {
  /**
   * The items to render.
   */
  items: ITreeItem[];
  /**
   * Default expand / collapse behavior.
   */
  defaultExpanded: boolean;
  /**
   * Specify the item selection mode.
   * By default this is set to none.
   */
  selectionMode: SelectionMode;
  /**
   * List of actions.
   */
  treeItemActions?: ITreeItemActions;

  /**
   * Callback function called after a item is expanded / collapsed.
   * @argument item The expanded / collapsed item.
   * @argument isExpanded The status of item (expanded / collapsed).
   */
  onExpandCollapse?: (item: ITreeItem, isExpanded: boolean) => void;

  /**
   * Callback function called after a item is selected.
   * @argument items The selected items.
   */
  onSelect?: (items: ITreeItem[]) => void;

  /**
   * Customize how items are rendered.
   * @argument item The tree item.
   */
  onRenderItem?: (item: ITreeItem) => JSX.Element;
}
