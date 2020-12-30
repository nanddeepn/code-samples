import * as React from 'react';
import styles from './TimeControls.module.scss';
import { ITimeControlsProps } from './ITimeControlsProps';
import { ITimeControlsState } from './ITimeControlsState';
import { escape } from '@microsoft/sp-lodash-subset';

export default class TimeControls extends React.Component<ITimeControlsProps, ITimeControlsState> {
  private intervalId: number;

  constructor(props: ITimeControlsProps) {
    super(props);

    this.state = {
      counter: 1,
      buttonText: "1"
    };
  }

  public componentDidMount() {
    const thisBoundedIncrementer = this.incrementCounter.bind(this);
    this.intervalId = setInterval(thisBoundedIncrementer, 1000);
  }

  private incrementCounter(): void {
    if (this.state.counter <= 4) {
      const { counter } = this.state;
      this.setState({ counter: counter + 1, buttonText: (counter + 1).toString() });
    }
    else {
      this.setState({ buttonText: "Close" });
      clearInterval(this.intervalId);
    }
  }

  public render(): React.ReactElement<ITimeControlsProps> {
    return (
      <div className={styles.timeControls}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Please read this carefully, before you proceed.</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <button className={styles.button} disabled={this.state.buttonText !== "Close"}>{this.state.buttonText}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
