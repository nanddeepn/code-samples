import * as React from 'react';
import styles from './ParentChildCall.module.scss';
import { IParentChildCallProps } from './IParentChildCallProps';
import { IParentChildCallState } from './IParentChildCallState';
import { escape } from '@microsoft/sp-lodash-subset';
import Child from './Child';

export default class ParentChildCall extends React.Component<IParentChildCallProps, IParentChildCallState> {
  /**
   * Constructor method
   * @param props properties interface
   */
  constructor(props: IParentChildCallProps) {
    super(props);

    this.state = {
      childData: ""
    };

    // Bind control events
    this.handleCallbak = this.handleCallbak.bind(this);
  }

  private handleCallbak(childData: string): void {
    this.setState({
      childData: childData
    });
  }

  public render(): React.ReactElement<IParentChildCallProps> {
    return (
      <div className={styles.parentChildCall}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Parent Component</span>
              <p className={styles.subTitle}>Data from Child: {this.state.childData}</p>
              <Child childTitle="Title from Parent"
                parentCallback={this.handleCallbak}
              ></Child>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
