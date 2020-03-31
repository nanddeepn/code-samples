import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import styles from './TreeView.module.scss';
import { uniqBy } from '@microsoft/sp-lodash-subset';
import { ITreeViewProps, SelectionMode } from './ITreeViewProps';
import { ITreeViewState } from './ITreeViewState';
import { ITreeItem } from './ITreeItem';
import TreeItem from './TreeItem';

/**
 * Renders the controls for TreeItem component
 */
export default class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {

  private unselectArray = [];

  /**
   * Constructor method
   * @param props properties interface
   */
  constructor(props: ITreeViewProps) {
    super(props);

    this.state = {
      loaded: true,
      defaultExpanded: this.props.defaultExpanded,
      activeItems: []
    };

    // Bind control events
    this.handleTreeExpandCollapse = this.handleTreeExpandCollapse.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
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
            defaultExpanded={this.state.defaultExpanded}
            createChildNodes={this.createChildNodes}
            leftOffset={paddingLeft}
            selectionMode={this.props.selectionMode}
            activeItems={this.state.activeItems}
            isFirstRender={!paddingLeft ? true : false}
            parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
            parentCallbackOnSelect={this.handleOnSelect}
            onRenderItem={this.props.onRenderItem}
          />
        );
      });

      return childrenWithHandlers;
    }
  }

  /**
   * Fires When expand / collapse item in TreeView
   * @argument item The expanded / collapsed item
   * @argument isExpanded The status of item  (expanded / collapsed)
   */
  private handleTreeExpandCollapse(item: ITreeItem, isExpanded: boolean): void {
    if (typeof this.props.onExpandCollapse === "function") {
      this.props.onExpandCollapse(item, isExpanded);
    }
  }

  /**
   * Selects all child nodes when parent node is selected. 
   * @param item current tree item
   */
  private selectAllChildren(item): void {
    var tempItem: any = item;

    if (tempItem.children) {
      tempItem.children.forEach(element => {
        this.state.activeItems.push(element);

        if (element.children) {
          this.selectAllChildren(element);
        }
      });
    }
  }

  /**
   * Unselects all child nodes of selected parent.
   */
  private unSelectChildren(item): void {
    var tempItem: any = item;

    if (tempItem.children) {
      tempItem.children.forEach(element => {
        this.unselectArray.push(element.key);

        if (element.children) {
          this.unSelectChildren(element);
        }
      });
    }

  }

  /**
   * Fires When Tree Item is selected in TreeView
   * @argument item The selected item
   * @argument isSelected The status of item selection
   */
  private handleOnSelect(item: ITreeItem, isSelected: boolean): void {
    if (isSelected) {
      if (this.props.selectionMode == SelectionMode.Multiple) {
        // Add the checked term
        this.state.activeItems.push(item);

        this.selectAllChildren(item);

        // Filter out the duplicate terms
        this.setState({
          activeItems: uniqBy(this.state.activeItems, 'key')
        });
      }
      else {
        // Only store the current selected item
        this.setState({
          activeItems: [item]
        });
      }
    }
    else {
      // Remove the item from the list of active nodes
      this.unselectArray = [];
      this.unselectArray.push(item.key);
      this.unSelectChildren(item);
      var tempItems = this.state.activeItems;
      this.unselectArray.forEach(element => {
        tempItems = tempItems.filter(i => i.key != element);
      });

      this.setState({
        activeItems: tempItems
      });
    }

    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(this.state.activeItems);
    }
  }

  /**
   * Default React render method
   */
  public render(): JSX.Element {
    return (
      <React.Fragment>
        {
          this.props.items.map((treeNodeItem, index) => (
            <TreeItem
              treeItem={treeNodeItem}
              createChildNodes={this.createChildNodes}
              leftOffset={20}
              isFirstRender={true}
              defaultExpanded={true}
              selectionMode={this.props.selectionMode}
              activeItems={this.state.activeItems}
              parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
              parentCallbackOnSelect={this.handleOnSelect}
              onRenderItem={this.props.onRenderItem}
            />
          ))
        }
      </React.Fragment>
    );
  }
}
