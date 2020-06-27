import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ITimelineActivity, ITimelineActivityCollection } from "../models";

export class TimelineService {
    public context: WebPartContext;
  
    public setup(context: WebPartContext): void {
      this.context = context;
    }

    public test(): void {
    }
}

const TimelineActivityService = new TimelineService();
export default TimelineActivityService;