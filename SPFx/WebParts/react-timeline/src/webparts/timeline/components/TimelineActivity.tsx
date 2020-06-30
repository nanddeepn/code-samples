import * as React from 'react';
import styles from './Timeline.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITimelineActivity } from "../../../models";
import { Card,  ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { FontWeights } from '@uifabric/styling';
import { Icon, IIconStyles, Image, Stack, IStackTokens, Text, ITextStyles } from 'office-ui-fabric-react';
import {ContextualMenuItemType} from 'office-ui-fabric-react/lib/ContextualMenu';
import { Layer, IconButton, IButtonProps } from 'office-ui-fabric-react';
import { TimelineEvent } from "./Popup/TimelineEvent";
import TimelineService from "../../../services/TimelineService";
import { IPanelModelEnum } from "./Popup/IPanelModeEnum";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IActivityProps {
    activity: ITimelineActivity;
    context : WebPartContext;
  onDissmissPanel: (refresh: boolean) => void;  

}

export interface IActivityState {
  showDialog: boolean;
  eventData: ITimelineActivity[];
  selectedEvent: ITimelineActivity;
  startDateSlot?: Date;
  isloading: boolean;
  panelMode?: IPanelModelEnum;
  hasError: boolean;
  errorMessage: string;
  showItemPopup: boolean;
  showModal: boolean;
  isDraggable: boolean;
  isDeleting: boolean;
  displayDeleteDialog: boolean;
  selectedView?: string;
  displayEventDialog: boolean;
}


export default class TimelineActivity extends React.Component<
                 IActivityProps,
                 IActivityState
               > {
                 private TimelineService: TimelineService = null;
                 public constructor(props) {
                   super(props);

                   this.state = {
                     showDialog: false,
                     eventData: [],
                     selectedEvent: undefined,
                     isloading: true,
                     hasError: false,
                     errorMessage: "",
                     showItemPopup: false,
                     showModal: false,
                     isDraggable: false,
                     isDeleting: false,
                     displayDeleteDialog: false,
                     displayEventDialog: false,
                   };
                   this.TimelineService = new TimelineService(
                     this.props.context
                   );
                   this.onSelectEvent = this.onSelectEvent.bind(this);
                   this.onDismissPanel = this.onDismissPanel.bind(this);
                   this.handleSelectEvent = this.handleSelectEvent.bind(this);
                   this._dismissCardDetails = this._dismissCardDetails.bind(
                     this
                   );
                   this.deleteEvent = this.deleteEvent.bind(this);
                   this.editEvent = this.editEvent.bind(this);
                   this.createEvent = this.createEvent.bind(this);
                   this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
                   this.confirmDeleteDialog = this.confirmDeleteDialog.bind(
                     this
                   );
                 }
                 private confirmDeleteDialog() {
                   this.setState({ displayDeleteDialog: true });
                 }
                 private async onDismissPanel(refresh: boolean) {
                   this.setState({ showDialog: false, selectedEvent: null });

                   if (refresh === true) {
                    this.props.onDissmissPanel(true);
                   }
                 }
                 private onSelectEvent(event: any) {
                   this.setState({ showDialog: true, panelMode: 1 });
                 }
                 private deleteEvent(TimelineDeleteEvent:ITimelineActivity) {
                   if (confirm('Are you sure you want to delete this timeline event?')) {
                     this.TimelineService.deleteTimelineActivity(
                       "Timeline",
                       TimelineDeleteEvent
                     );

                     // Get the index of deleted event
                     let deletedEventIndex: number = this.state.eventData.indexOf(
                       this.state.selectedEvent
                     );
                     this.state.eventData.splice(deletedEventIndex, 1);

                     this.setState({
                       displayDeleteDialog: false,
                       selectedEvent: null,
                       displayEventDialog: false,
                     });
                     this.props.onDissmissPanel(true);
                    
                   } else {
                     // Do nothing!
                     
                   }
                  
                 }
                 private closeDeleteDialog(
                   ev: React.MouseEvent<HTMLDivElement>
                 ) {
                   ev.preventDefault();
                   this.setState({ displayDeleteDialog: false });
                 }

                 private editEvent() {
                   this.setState({
                     showDialog: true,
                     panelMode: 2,
                     displayEventDialog: false,
                   });
                 }

  private createEvent() {
    this.setState({
      showDialog: true,
      panelMode: 1,
      displayEventDialog: false,
    });
  }

                 private _dismissCardDetails() {
                   this.setState({ selectedEvent: null });
                 }
                 private handleSelectEvent(event: ITimelineActivity) {
                   this.setState({
                     selectedEvent: event,
                     displayEventDialog: true,
                   });
                 }

                 public render(): React.ReactElement<IActivityProps> {
                   const siteTextStyles: ITextStyles = {
                     root: {
                       color: "#025F52",
                       fontWeight: FontWeights.semibold,
                     },
                   };

                   const descriptionTextStyles: ITextStyles = {
                     root: {
                       color: "#333333",
                       fontWeight: FontWeights.regular,
                     },
                   };
                   const helpfulTextStyles: ITextStyles = {
                     root: {
                       color: "#333333",
                       fontWeight: FontWeights.regular,
                     },
                   };
                   const iconStyles: IIconStyles = {
                     root: {
                       color: "#0078D4",
                       fontSize: 16,
                       fontWeight: FontWeights.regular,
                     },
                   };
                   const footerCardSectionStyles: ICardSectionStyles = {
                     root: {
                       alignSelf: "stretch",
                       borderLeft: "1px solid #F3F2F1",
                     },
                   };

                   const sectionStackTokens: IStackTokens = { childrenGap: 20 };
                   const cardTokens: ICardTokens = { childrenMargin: 12 };
                   const footerCardSectionTokens: ICardSectionTokens = {
                     padding: "0px 0px 0px 12px",
                   };

                   const { activity } = this.props;

                   return (
                     <Stack tokens={sectionStackTokens}>
                       <p><i className="ms-Icon ms-Icon--Add" onClick= {this.createEvent} aria-hidden="true">Add</i></p>
                       {this.state.showDialog && (
                         <TimelineEvent
                           event={this.state.selectedEvent}
                           panelMode={this.state.panelMode}
                           onDissmissPanel={this.onDismissPanel}
                           showPanel={this.state.showDialog}
                           startDate={this.state.startDateSlot}                          
                           context={this.props.context}                                               
                         />
                       )}
                       <Card
                         aria-label="Clickable horizontal card "
                         horizontal
                         tokens={cardTokens}
                       >
                        
                         <Card.Item fill>
                           <Image
                             src="https://placehold.it/180x135"
                             alt="Placeholder image."
                           />
                         </Card.Item>
                         <Card.Section>
                           <Text variant="small" styles={siteTextStyles}>
                             {activity.acivityLink ? (
                               <a href={activity.acivityLink} target="_blank">
                                 {activity.activityTitle}
                               </a>
                             ) : (
                               activity.activityTitle
                             )}
                           </Text>
                           <Text styles={descriptionTextStyles}>
                             {activity.activityDescription}
                           </Text>
                           <Text variant="small" styles={helpfulTextStyles}>
                             {activity.acivityDate}
                           </Text>
                         </Card.Section>
                         <Card.Section
                           styles={footerCardSectionStyles}
                           tokens={footerCardSectionTokens}
                         >
                           <IconButton
                             id="ContextualMenuButton1"
                             text=""
                             width="30"
                             split={false}
                             iconProps={{ iconName: "MoreVertical" }}
                             style={{ float: "right" }}
                             menuIconProps={{ iconName: "" }}
                             menuProps={{
                               shouldFocusOnMount: true,
                               items: [
                                 {
                                   key: "Edit",
                                   name: "Edit",
                                   onClick: (event) => {
                                    
                                     this.setState({ selectedEvent: activity });
                                     this.editEvent();
                                   },
                                 },
                                 {
                                   key: "divider_1",
                                   itemType: ContextualMenuItemType.Divider,
                                 },
                                 {
                                   key: "Delete",
                                   name: "Delete",
                                   onClick: (event) => {
                                     this.setState({
                                       selectedEvent: activity
                                     });
                                     this.deleteEvent(activity);
                                   },
                                 },
                               ],
                             }}
                           />
                         </Card.Section>
                       </Card>
                     </Stack>
                   );
                 }
               }
