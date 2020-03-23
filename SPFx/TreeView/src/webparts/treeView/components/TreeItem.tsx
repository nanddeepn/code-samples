import * as React from 'react';
import styles from './TreeView.module.scss';
import { ITreeItemProps } from './ITreeItemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as strings from 'TreeViewWebPartStrings';

/**
 * Image URLs / Base64
 */
export const COLLAPSED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII='; // /_layouts/15/images/MDNCollapsed.png
export const EXPANDED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII='; // /_layouts/15/images/MDNExpanded.png


export interface ITreeItemState {
  collapsed?: boolean;
}

export default class TreeItem extends React.Component<ITreeItemProps, ITreeItemState> {
  constructor(props: ITreeItemProps, state: ITreeItemState) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
    this.state = {
      collapsed: this.props.defaultCollapsed
    };
  }

  private clickHandler = () => this.setState({
    collapsed: !this.state.collapsed
  })

  public render(): React.ReactElement<ITreeItemProps> {

    const { data, leftOffset, isFirstRender, createChildrenNodes, label } = this.props;

    const styleProps: React.CSSProperties = {
      marginLeft: isFirstRender ? '0px' : `${leftOffset}px`
    };
    const checkBoxStyle: React.CSSProperties = {
      display: "inline-flex"
    };

    return (
      <React.Fragment>
        <div className={`${styles.listItem} ${styles.tree}`} style={styleProps || {}} onClick={() => this.clickHandler()}>

          <div>
            {
              data &&
              <img src={this.state.collapsed ? COLLAPSED_IMG : EXPANDED_IMG}
                alt={this.state.collapsed ? strings.TreeCollapseTitle : strings.TreeExpandTitle}
                title={this.state.collapsed ? strings.TreeCollapseTitle : strings.TreeExpandTitle} />
            }
            <Checkbox
              className={styles.treeSelector}
              style={checkBoxStyle}
              label={label}
              onChange={this._handleChange} />
          </div>
        </div>
        <div>
          {
            !this.state.collapsed && data
              ? createChildrenNodes(data, 2 * leftOffset) // we double left padding on every recursion/depth
              : null
          }
        </div>
      </React.Fragment>
    );
  }

  /**
   * Handle the checkbox change trigger
   */
  private _handleChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    // this.setState({
    //   selected: isChecked
    // });
    // this.props.changedCallback(this.props.term, isChecked);
  }
}
