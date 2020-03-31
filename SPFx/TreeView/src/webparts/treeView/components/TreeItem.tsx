import * as React from 'react';
import styles from './TreeView.module.scss';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IconButton } from 'office-ui-fabric-react';
import * as strings from 'TreeViewWebPartStrings';
import { ITreeItem } from './ITreeItem';
import { SelectionMode } from './ITreeViewProps';
import TreeItemActionsControl from './TreeItemActionsControl';

/**
 * TreeItem properties interface
 */
export interface ITreeItemProps {
  /**
   * Current tree item.
   */
  treeItem: ITreeItem;
  /**
   * Selection mode of tree item.
   */
  selectionMode: SelectionMode;
  /**
   * Create child nodes.
   */
  createChildNodes: any;
  /**
   * Specifies the left padding for current tree item based on hierarchy.
   */
  leftOffset: number;
  /**
   * Specifies whether current tree item is root.
   */
  isFirstRender: boolean;
  /**
   * Specifies whether current tree item should be rendered as an expanded. 
   */
  defaultExpanded: boolean;
  /**
   * Stores the selected tree items
   */
  activeItems: ITreeItem[];

  /**
   * Callback function called after a item is expanded / collapsed.
   */
  parentCallbackExpandCollapse: (item: ITreeItem, isExpanded: boolean) => void;
  /**
   * Callback function called after a item is selected.
   */
  parentCallbackOnSelect: (item: ITreeItem, isSelected: boolean) => void;
  /**
   * Customize how item is rendered.
   */
  onRenderItem?: (item: ITreeItem) => JSX.Element;
}

/**
 * TreeItem state interface
 */
export interface ITreeItemState {
  /**
   * Specifies whether current tree item is selected
   */
  selected?: boolean;
  /**
   * Specifies whether current tree item is expanded
   */
  expanded?: boolean;
}

/**
 * CSS styles for checkbox
 */
const checkBoxStyle: React.CSSProperties = {
  display: "inline-flex"
};

/**
 * Renders the controls for TreeItem component
 */
export default class TreeItem extends React.Component<ITreeItemProps, ITreeItemState> {

  /**
   * Constructor method
   * @param props properties interface
   */
  constructor(props: ITreeItemProps, state: ITreeItemState) {
    super(props);

    // Check if current item is selected
    let active = this.props.activeItems.filter(item => item.key === this.props.treeItem.key);

    this.state = {
      selected: active.length > 0,
      expanded: this.props.defaultExpanded
    };

    // Bind control events
    this._itemSelected = this._itemSelected.bind(this);
    this._handleExpandCollapse = this._handleExpandCollapse.bind(this);
  }

  /**
   * Handle the checkbox change trigger
   */
  private _itemSelected(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    this.props.parentCallbackOnSelect(this.props.treeItem, isChecked);
  }

  /**
   * Handle the click event: collapse or expand
   */
  private _handleExpandCollapse(): void {
    this.setState({
      expanded: !this.state.expanded
    });

    this.props.parentCallbackExpandCollapse(this.props.treeItem, !this.state.expanded);
  }

  /**
   * Lifecycle event hook when component retrieves new properties
   * @param nextProps
   * @param nextContext
   */
  public componentWillReceiveProps?(nextProps: ITreeItemProps, nextContext: any): void {
    // If selection is turned on, set the item as selected
    if (this.props.selectionMode != SelectionMode.None) {
      let active = nextProps.activeItems.filter(item => item.key === this.props.treeItem.key);

      this.setState({
        selected: active.length > 0,
        expanded: this.state.expanded
      });
    }
  }

  /**
   * Default or custom rendering of tree item 
   */
  private renderItem(item: ITreeItem): JSX.Element {
    if (typeof this.props.onRenderItem === "function") {
      // Custom rendering of tree item 
      return this.props.onRenderItem(item);
    }
    else {
      return (
        // Default rendering of tree item 
        <React.Fragment>
          <Label className={`${item.subLabel ? styles.itemLabel : ""}`} style={checkBoxStyle}>{item.label}</Label>
          {item.subLabel &&
            <Label className={styles.itemSubLabel} style={checkBoxStyle}>{item.subLabel}</Label>
          }
        </React.Fragment>
      );
    }
  }

  /**
   * Default action callback
   */
  private treeItemActionCallback = (): void => {
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<ITreeItemProps> {
    const { treeItem, leftOffset, isFirstRender, createChildNodes } = this.props;

    const styleProps: React.CSSProperties = {
      marginLeft: isFirstRender ? '0px' : `${leftOffset}px`
    };

    return (
      <React.Fragment>
        <div className={`${styles.listItem} ${styles.tree}`} style={styleProps || {}} >
          <div className={`${styles.treeSelector}`}>
            {
              treeItem.children &&
              <IconButton
                iconProps={this.state.expanded ? { iconName: 'ChevronDown' } : { iconName: 'ChevronRight' }}
                alt={this.state.expanded ? strings.TreeExpandTitle : strings.TreeCollapseTitle}
                title={this.state.expanded ? strings.TreeExpandTitle : strings.TreeCollapseTitle}
                onClick={() => this._handleExpandCollapse()}></IconButton>
            }
          </div>
          <div className={`${styles.treeSelector}`}>
            {
              this.props.selectionMode != SelectionMode.None &&
              <Checkbox
                checked={this.state.selected}
                disabled={treeItem.disabled}
                checkmarkIconProps={treeItem.iconProps}
                className={styles.treeSelector}
                style={checkBoxStyle}
                onChange={this._itemSelected} />
            }
            {
              this.renderItem(treeItem)
            }
          </div>
          {
            treeItem.treeItemActions &&
            <div className={styles.itemMenu}>
              <TreeItemActionsControl treeItem={this.props.treeItem}
                treeItemActions={treeItem.treeItemActions}
                treeItemActionCallback={this.treeItemActionCallback} />
            </div>
          }
        </div>
        <div>
          {
            this.state.expanded && treeItem.children
              ? createChildNodes(treeItem.children, 2 * leftOffset) // we double left padding on every recursion/depth
              : null
          }
        </div>
      </React.Fragment>
    );
  }
}
