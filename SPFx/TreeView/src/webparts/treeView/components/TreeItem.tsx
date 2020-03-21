import * as React from 'react';
import styles from './TreeView.module.scss';
import { ITreeItemProps } from './ITreeItemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export default class TreeItem extends React.Component<ITreeItemProps, {}> {
  constructor(props: ITreeItemProps) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  public render(): React.ReactElement<ITreeItemProps> {
    const styleProps: React.CSSProperties = {
      marginLeft: `${(this.props.PathDepth * 30)}px`
    };
    const checkBoxStyle: React.CSSProperties = {
      display: "inline-flex"
    };

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
