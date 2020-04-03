import * as React from 'react';
import styles from './TreeView.module.scss';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
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
   * Specifies whether current tree item should be rendered as an expanded. 
   */
  showCheckboxes: boolean;

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
    this.setState({
      selected: !this.state.selected
    });

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

          {item.selectable == false  && !item.children &&
              <span className={styles.blankspace}>&nbsp;</span>
          }
          {item.iconProps &&
            <React.Fragment>
              <Icon iconName={item.iconProps.iconName} style={item.iconProps.style} className="ms-IconExample" />
              &nbsp;
          </React.Fragment>
          }

          {
            !this.props.showCheckboxes &&
            <Label className={`${this.state.selected && this.props.showCheckboxes == false ? styles.navLabel : ""}`}
              onClick={(e) => this._itemSelected(e, true)}
              style={checkBoxStyle}
              disabled={item.disabled}>
              {item.label}
            </Label>
          }

          {
            this.props.showCheckboxes &&
            <Label className={`${item.subLabel ? styles.itemLabel : ""}`} style={this.props.showCheckboxes ? checkBoxStyle : null}>{item.label}</Label>
          }

          {item.subLabel &&
            <Label className={this.props.showCheckboxes ? styles.itemSubLabel : styles.itemSubLabelNav} style={this.props.showCheckboxes ? checkBoxStyle : null}>{item.subLabel}</Label>
          }
        </React.Fragment>
      );
    }
  }

  /**
   * Process the child nodes
   */
  public createChildNodes = (list, paddingLeft) => {
    if (list.length) {
      let childrenWithHandlers = list.map((item, index) => {
        return (
          <TreeItem
            treeItem={item}
            defaultExpanded={this.props.treeItem.key === item.key ? this.state.expanded : false}
            leftOffset={paddingLeft}
            selectionMode={this.props.selectionMode}
            activeItems={this.props.activeItems}
            isFirstRender={!paddingLeft ? true : false}
            parentCallbackExpandCollapse={this.props.parentCallbackExpandCollapse}
            parentCallbackOnSelect={this.props.parentCallbackOnSelect}
            onRenderItem={this.props.onRenderItem}
            showCheckboxes={this.props.showCheckboxes}
          />
        );
      });

      return childrenWithHandlers;
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
    const { treeItem, leftOffset, isFirstRender } = this.props;

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
                alt={this.state.expanded ? strings.TreeCollapseTitle : strings.TreeExpandTitle}
                title={this.state.expanded ? strings.TreeCollapseTitle : strings.TreeExpandTitle}
                onClick={() => this._handleExpandCollapse()}></IconButton>
            }
          </div>
          <div className={`${styles.treeSelector}`}>
            {
              (treeItem.selectable != false) &&  this.props.selectionMode != SelectionMode.None && this.props.showCheckboxes &&
              <Checkbox
                checked={this.state.selected}
                disabled={treeItem.disabled}
                className={styles.treeSelector}
                style={checkBoxStyle}
                onChange={this._itemSelected}
                 />
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
              ? this.createChildNodes(treeItem.children, 2 * leftOffset) // we double left padding on every recursion/depth
              : null
          }
        </div>
      </React.Fragment>
    );
  }


}
