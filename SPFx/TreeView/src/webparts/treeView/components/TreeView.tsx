import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import styles from './TreeView.module.scss';
import { ITreeViewProps, SelectionMode } from './ITreeViewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sortBy, uniqBy, cloneDeep, isEqual } from '@microsoft/sp-lodash-subset';

import { ITreeViewState } from './ITreeViewState';
import { ITreeItem, ITreeNodeItem } from './ITreeItem';
import TreeItem from './TreeItem';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export default class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {
  private _treeItems: ITreeNodeItem[];

  constructor(props: ITreeViewProps) {
    super(props);

    this._treeItems = this.props.items;
    this.state = {
      loaded: true,
      defaultExpanded: this.props.defaultExpanded,
      activeItems: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTreeExpandCollapse = this.handleTreeExpandCollapse.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  /**
   * Process the child nodes
   */
  public createChildrenNodes = (list, paddingLeft) => {
    if (list.length) {
      let childrenWithHandlers = list.map((item, index) => {
        return (
          <TreeItem
            treeNodeItem={item}
            defaultExpanded={this.state.defaultExpanded}
            createChildrenNodes={this.createChildrenNodes}
            leftOffset={paddingLeft}
            selectionMode={this.props.selectionMode}
            activeItems={this.state.activeItems}
            isFirstRender={!paddingLeft ? true : false} // TODO: make better usage of this logic or remove it
            parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
            parentCallbackonSelect={this.handleOnSelect}
            treeItem={item}
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
  private handleTreeExpandCollapse(item: ITreeItem, isExpanded: boolean) {
    this.props.onExpandCollapse(item, isExpanded);
  }

  /**
   * Fires When Tree Item is selected in TreeView
   * @argument item The selected item
   *  @argument isSelected The status of item selection
   */
  private handleOnSelect(item: ITreeItem, isSelected: boolean) {
    this.props.onSelect(item, isSelected);

    if (isSelected) {
      if (this.props.selectionMode == SelectionMode.Multiple) {
        // Add the checked term
        this.state.activeItems.push(item);

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
      // Remove the term from the list of active nodes
      this.setState({
        activeItems: this.state.activeItems.filter(i => i.key !== item.key)
      });
    }
  }

  /**
   * Build a Tree structure from flat array with below logic:
   * 1. Iterate through the data array
   * 2. Find the parent element of the current element
   * 3. In the parent element's object, add a reference to the child
   * 4. If there is no parent for an element, we know that will be our tree's "root" element
   * Reference: https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
   */
  private buildTreeStructure(): any {
    // Create a mapping of our element IDs to array index. This will help us to add references to an element's parent.
    const idMapping = this._treeItems.reduce((acc, el, i) => {
      acc[el.key] = i;
      return acc;
    }, {});

    // Iterate through the object and assign references to each item's parent. 
    // Use idMapping to help locate the parent.
    let root: any;

    this._treeItems.forEach(el => {
      // Handle the root element
      if (el.parentKey === undefined || el.parentKey === null) {
        root = el;
        return;
      }

      // Use our mapping to locate the parent element in our data array
      const parentEl = this._treeItems[idMapping[el.parentKey]];

      // Add our current el to its parent's `children` array
      parentEl.children = [...(parentEl.children || []), el];
    });

    return root;
  }

  /**
   * Default React render method
   */
  public render(): JSX.Element {
    let root: any = this.buildTreeStructure();

    return (
      <React.Fragment>
        <TreeItem
          treeNodeItem={root}
          createChildrenNodes={this.createChildrenNodes}
          leftOffset={20}
          isFirstRender={true}
          defaultExpanded={true}
          selectionMode={this.props.selectionMode}
          activeItems={this.state.activeItems}
          parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
          parentCallbackonSelect={this.handleOnSelect}
          treeItem={root}
        />
      </React.Fragment>
    );
  }

  /**
   * Handle the click event: collapse or expand
   */
  private handleClick() {
    this.setState({
      defaultExpanded: !this.state.defaultExpanded
    });
  }

  /**
   * The tree view selection changed
   */
  private treeViewSelectionChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    // this.props.termSetSelectedChange(this.props.termset, isChecked);
  }
}
