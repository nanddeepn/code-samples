import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import styles from './TreeView.module.scss';
import { ITreeViewProps } from './ITreeViewProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ITreeViewState } from './ITreeViewState';
import { ITreeItem } from './ITreeItem';
import TreeItem from './TreeItem';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

/**
 * Image URLs / Base64
 */
export const COLLAPSED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII='; // /_layouts/15/images/MDNCollapsed.png
export const EXPANDED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII='; // /_layouts/15/images/MDNExpanded.png


export default class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {
  private _treeItems: ITreeItem[];

  constructor(props: ITreeViewProps) {
    super(props);

    this._treeItems = this.props.TermItems;
    this.state = {
      loaded: true,
      defaultCollapsed: this.props.defaultCollapsed
    };
    this._handleClick = this._handleClick.bind(this);
  }

  public groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  

 public createChildrenNodes = (list, paddingLeft) => {
      if (list.length) {
        let childrenWithHandlers = list.map((item, index) => {
          return (
            
            <TreeItem
              key={index}
              label={item.Name}
              data={item.children}
              defaultCollapsed={this.state.defaultCollapsed}
              createChildrenNodes={this.createChildrenNodes}
              leftOffset={paddingLeft}
              isFirstRender={!paddingLeft ? true : false} // TODO: make better usage of this logic or remove it
            />
          );
        });
        return childrenWithHandlers;
      }
    }

  

  /**
   * Default React render method
   */
  //public render(): React.ReactElement<ITreeViewProps> {
  public render(): JSX.Element {
    const grouped: Map<any, any> = this.groupBy(this._treeItems, pet => pet.ParentId);
    //grouped.get("0");
    grouped.forEach(x => {
      console.log(x);
    });

    // https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
    const idMapping = this._treeItems.reduce((acc, el, i) => {
      acc[el.Id] = i;
      return acc;
    }, {});

    let root;
    this._treeItems.forEach(el => {
      // Handle the root element
      if (el.ParentId === undefined || el.ParentId === null) {
        root = el;
        return;
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = this._treeItems[idMapping[el.ParentId]];
      // Add our current el to its parent's `children` array
      parentEl.children = [...(parentEl.children || []), el];
    });
    console.log(root);



    // // Specify the inline styling to show or hide the termsets
    // const styleProps: React.CSSProperties = {
    //   display: this.state.defaultCollapsed ? 'none' : 'block'
    // };

    // let treeItemElm: JSX.Element = <div />;

    // // Check if the terms have been loaded
    // if (this.state.loaded) {
    //   if (this._treeItems.length > 0) {
    //     treeItemElm = (
    //       <div style={styleProps}>
    //         {
    //             this._treeItems.map(treeItem => {
    //             // return <TreeItem key={treeItem.Id}
    //             //   label={treeItem.Name} />;

    //             // return <Term key={term.Id}
    //             //   term={term}
    //             //   termset={this.props.termset.Id}
    //             //   activeNodes={this.props.activeNodes}
    //             //   changedCallback={this.props.changedCallback}
    //             //   multiSelection={this.props.multiSelection}
    //             //   disabled={disabled}
    //             //   termActions={this.props.termActions}
    //             //   updateTaxonomyTree={this.props.updateTaxonomyTree}
    //             //   spTermService={this.props.spTermService} />;
    //           })
    //         }
    //       </div>
    //     );
    //   } else {
    //     //treeItemElm = <div className={`${styles.listItem} ${styles.term}`}>{strings.TaxonomyPickerNoTerms}</div>;
    //     treeItemElm = <div>No Tree Items</div>;
    //   }
    // } else {
    //   treeItemElm = <Spinner type={SpinnerType.normal} />;
    // }


    return(
      <React.Fragment>
         <TreeItem
              key={root.Id}
              label={root.Name}
              data={root.children}
              createChildrenNodes={this.createChildrenNodes}
              leftOffset={20}
              isFirstRender={true}
              defaultCollapsed={this.state.defaultCollapsed} // TODO: make better usage of this logic or remove it
            />

      
        {/* {this.createChildrenNodes(root,20)} */}
        </React.Fragment>
      
    );

    

    // return (
    //   <div>
    //     <div onClick={this._handleClick}>
    //       <img src={this.state.expanded ? EXPANDED_IMG : COLLAPSED_IMG} />
    //       {
    //         // Show the termset selection box
    //         //(!this.props.anchorId && this.props.isTermSetSelectable) &&
    //         <Checkbox onChange={this.treeViewSelectionChange} />
    //       }
    //       {/* <img src={this.props.anchorId ? TERM_IMG : TERMSET_IMG} alt={strings.TaxonomyPickerMenuTermSet} title={strings.TaxonomyPickerMenuTermSet} /> */}
    //       {/* {
    //         this.props.anchorId ?
    //           this._anchorName :
    //           this.props.termset.Name
    //       } */}
    //     </div>
    //     <div style={styleProps}>
    //       {treeItemElm}
    //     </div>
    //   </div>
    // );
  }

  /**
   * Handle the click event: collapse or expand
   */
  private _handleClick() {
    this.setState({
      defaultCollapsed: !this.state.defaultCollapsed
    });
  }

  /**
   * The tree view selection changed
   */
  private treeViewSelectionChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    // this.props.termSetSelectedChange(this.props.termset, isChecked);
  }
}
