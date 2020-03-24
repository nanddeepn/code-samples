import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';

/**
 * Tree Item
 */
export interface ITreeItem {
  parentKey?: string;
  key: string;
  label: string;
  iconProps?: IIconProps;
  disabled?: boolean;
  data?: any;
  actions?: IContextualMenuItem[];
}

export interface ITreeNodeItem extends ITreeItem {
  children?: ITreeItem[];
}