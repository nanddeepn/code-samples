import * as React from 'react';
import styles from './Timeline.module.scss';
import { ITimelineProps } from './ITimelineProps';
import { ITimelineState } from './ITimelineState';
import { escape } from '@microsoft/sp-lodash-subset';
import TimelineService from '../../../services/TimelineService';
import { ITimelineActivity } from "../../../models";

export default class Timeline extends React.Component<ITimelineProps, ITimelineState> {
  private TimelineService: TimelineService = null;

  constructor(props: ITimelineProps) {
    super(props);

    this.state = {
      timelineActivities: []
    };

    this.TimelineService = new TimelineService(this.props.context);
  }

  public render(): React.ReactElement<ITimelineProps> {
    return (
      <div className={styles.timeline}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              {this.state.timelineActivities.map((activity, i) => {
                console.log("Entered");
                return (<div>{activity.activityTitle}</div>);
                // Return the element. Also pass key     
                // return (<Answer key={i} answer={answer} />)
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    this.TimelineService.getTimelineActivities("Timeline").then((activities: ITimelineActivity[]) => {
      this.setState({ timelineActivities: activities });
    });
  }
}
