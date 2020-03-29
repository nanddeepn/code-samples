import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';

/**
 * Public properties of the Tree Item
 */
export interface ITreeItem {
  /**
   * Unique key to identify tree item.
   */
  key: string;
  /**
   * Property field label displayed on top.
   */
  label: string;
  /**
   * Sub label to be displayed on top.
   */
  subLabel?: string;
  /**
   * Custom icon props for the check mark rendered by the checkbox.
   */
  iconProps?: IIconProps;
  /**
   * Disabled state of the tree item.
   */
  disabled?: boolean;
  /**
   * Additional data of the tree item.
   */
  data?: any;
  /**
   * List of actions.
   */
  actions?: IContextualMenuItem[];
  /**
   * List of child tree items.
   */
  children?: ITreeItem[];
}
