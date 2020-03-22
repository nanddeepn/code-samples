import * as React from 'react';
import styles from './TreeView.module.scss';
import { ITreeItemProps } from './ITreeItemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface ITreeItemState {
  
  collapsed?: boolean;
}

export default class TreeItem extends React.Component<ITreeItemProps, ITreeItemState> {
  constructor(props: ITreeItemProps,state:ITreeItemState) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
    this.state = {
      collapsed: this.props.defaultCollapsed
    };
  }

  private clickHandler = () => this.setState({ collapsed: !this.state.collapsed });
  public render(): React.ReactElement<ITreeItemProps> {

    const { data,  leftOffset, isFirstRender, createChildrenNodes,label } = this.props;
    const styleProps: React.CSSProperties = {
      marginLeft: isFirstRender ? '0px' : `${leftOffset}px`
    };
    const checkBoxStyle: React.CSSProperties = {
      display: "inline-flex"
    };

    // we merge the base styles with increased left padding
    
    return (
      <React.Fragment>
        <div style={styleProps || {}} onClick={() => this.clickHandler()}>
            <div>
            {
              data &&
              <React.Fragment>
                {
                  this.state.collapsed
                  ? <Icon iconName="CollapseContentSingle" className="ms-IconExample" />
                  : <Icon iconName="SkypeCircleMinus" className="ms-IconExample" />
                }
              </React.Fragment>
            }
              {/* {label ? label : `No Name`} */}
              <Checkbox
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

    

    return (
      <div>
        <div style={styleProps}>
            <Checkbox
              style={checkBoxStyle}
              label={this.props.label}
              onChange={this._handleChange} />
        </div>
      </div>
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
