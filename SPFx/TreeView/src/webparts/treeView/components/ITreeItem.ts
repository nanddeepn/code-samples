import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';

/**
 * Tree Item
 */
export interface ITreeItem {
  parentKey?: string;
  key: string;
  label: string;
  subLabel?: string;
  iconProps?: IIconProps;
  disabled?: boolean;
  data?: any;
  actions?: IContextualMenuItem[];
}

export interface ITreeNodeItem extends ITreeItem {
  children?: ITreeItem[];
}