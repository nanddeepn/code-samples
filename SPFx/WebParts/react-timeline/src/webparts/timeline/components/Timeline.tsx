import * as React from 'react';
import styles from './Timeline.module.scss';
import { ITimelineProps } from './ITimelineProps';
import { ITimelineState } from './ITimelineState';
import { escape } from '@microsoft/sp-lodash-subset';
import TimelineService from '../../../services/TimelineService';

import TimelineActivity from "./TimelineActivity";
import { ITimelineActivity } from "../../../models/ITimelineActivity";



export default class Timeline extends React.Component<ITimelineProps, ITimelineState> {
  private TimelineService: TimelineService = null;

  constructor(props: ITimelineProps) {
    super(props);

    this.state = {
      timelineActivities: [],
      isloading: false
    };

    this.TimelineService = new TimelineService(this.props.context);
    this.onDismissPanel = this.onDismissPanel.bind(this);
  }

  private async onDismissPanel(refresh: boolean) {
  
    if (refresh === true) {
      this.TimelineService.getTimelineActivities("Timeline").then((activities: ITimelineActivity[]) => {
        this.setState({ timelineActivities: activities });
      });
    }
  }

  public render(): React.ReactElement<ITimelineProps> {
    return (
      <div className={styles.timeline}>
        <div className={styles.timelineContainer}>
          {this.state.timelineActivities.map((activity, i) => {
            return (<TimelineActivity activity={activity} index={i} context={this.props.context} onDissmissPanel={this.onDismissPanel} displayPanel={false} listName={this.props.listName} layout={this.props.layout} position={this.props.position} ></TimelineActivity>);
          })}
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
