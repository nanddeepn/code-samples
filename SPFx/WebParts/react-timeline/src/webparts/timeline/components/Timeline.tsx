import * as React from 'react';
import styles from './Timeline.module.scss';
import { ITimelineProps } from './ITimelineProps';
import { escape } from '@microsoft/sp-lodash-subset';
import TimelineService from '../../../services/TimelineService';

export default class Timeline extends React.Component<ITimelineProps, {}> {
  private TimelineService: TimelineService = null;

  constructor(props: ITimelineProps) {
    super(props);

    // this.state = {
    //     test: undefined
    // };

    this.TimelineService = new TimelineService(this.props.context);
}

  public render(): React.ReactElement<ITimelineProps> {
    return (
      <div className={ styles.timeline }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  public componentDidMount(): void {
    this._test();
  }

  public _test = (): void => {
    this.TimelineService.test();
  }
}
