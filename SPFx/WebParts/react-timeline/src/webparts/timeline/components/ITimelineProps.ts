import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITimelineProps {
  context: WebPartContext;
  description: string;
  listName: string;
  layout: string;
  position: string;
}
