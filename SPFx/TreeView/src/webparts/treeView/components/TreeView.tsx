import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import styles from './TreeView.module.scss';
import { ITreeViewProps, SelectionMode } from './ITreeViewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sortBy, uniqBy, cloneDeep, isEqual } from '@microsoft/sp-lodash-subset';

import { ITreeViewState } from './ITreeViewState';
import { ITreeItem } from './ITreeItem';
import TreeItem from './TreeItem';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export default class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {

  private unselectArray = [];
  constructor(props: ITreeViewProps) {
    super(props);

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
            treeItem={item}
            defaultExpanded={this.state.defaultExpanded}
            createChildrenNodes={this.createChildrenNodes}
            leftOffset={paddingLeft}
            selectionMode={this.props.selectionMode}
            activeItems={this.state.activeItems}
            isFirstRender={!paddingLeft ? true : false} // TODO: make better usage of this logic or remove it
            parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
            parentCallbackonSelect={this.handleOnSelect}
            onRenderItem={this.props.onRenderItem}
            treeItemActions={this.props.treeItemActions}
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

  
private selectAllChildren(item){
  var tempItem:any = item;
  if(tempItem.children){
  tempItem.children.forEach(element => {
    this.state.activeItems.push(element);
    if(element.children){
      this.selectAllChildren(element);
    }
  });
  }
}


private unSelectChildren(item){

  var tempItem:any = item;
  if(tempItem.children){
  tempItem.children.forEach(element => {
    this.unselectArray.push(element.key);
    if(element.children){
      this.unSelectChildren(element);
    }
    });
  }

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
         tempItems = tempItems.filter(i => i.key !=  element);
      });
      
      this.setState({
        activeItems: tempItems
      });
      
      
    }
  }

  /**
   * Default React render method
   */
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <TreeItem
          treeItem={this.props.items[0]}
          createChildrenNodes={this.createChildrenNodes}
          leftOffset={20}
          isFirstRender={true}
          defaultExpanded={true}
          selectionMode={this.props.selectionMode}
          activeItems={this.state.activeItems}
          parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
          parentCallbackonSelect={this.handleOnSelect}
          onRenderItem={this.props.onRenderItem}
          treeItemActions={this.props.treeItemActions}
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
