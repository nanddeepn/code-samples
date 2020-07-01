import * as React from 'react';
import styles from './timelineEvent.module.scss';
import { IEventProps } from './ITimeLineEventProps';
import { IEventState } from './ITimeLineEventState';
import { ITimelineActivity } from '../../../../models/ITimelineActivity';
import {
  TextField,
  Label, DirectionalHint,
  DatePicker,
  IDatePickerStrings,
  Dropdown,
  IDropdownOption,
  IDropdownProps,
  DefaultButton,
  PrimaryButton,
  IPersonaProps,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogType,
  DialogFooter,
  Checkbox
} from 'office-ui-fabric-react';
import * as moment from 'moment';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IPanelModelEnum } from './IPanelModeEnum';
import TimelineService from "../../../../services/TimelineService";

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  isRequiredErrorMessage: 'Start date is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '160px'
  },
});

export class TimelineEvent extends React.Component<IEventProps, IEventState> {
  private TimelineService: TimelineService = null;
  
  public constructor(props) {
    super(props);
    

    this.state = {
      showPanel: false,
      eventData: this.props.event,
      startSelectedHour: { key: '09', text: '00' },
      startSelectedMin: { key: '00', text: '00' },
      activityTitle: null,
      acivityLink: null,
      acivityDate: new Date(),
      activityPictureUrl: null,
      activityDescription: null, 
      hasError: false,
      errorMessage: '',
      disableButton: false,
      isSaving: false,
      displayDialog: false,
      isloading: false,
    };
    this.TimelineService = new TimelineService(this.props.context);
    this.onStartChangeHour = this.onStartChangeHour.bind(this);
    this.onStartChangeMin = this.onStartChangeMin.bind(this);  
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onRenderFooterContent = this.onRenderFooterContent.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelectDateStart = this.onSelectDateStart.bind(this);
    this.onGetErrorMessageTitle = this.onGetErrorMessageTitle.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);    
    this._onEventTitleChange = this._onEventTitleChange.bind(this);
    this._onActivityPictureURLChange = this._onActivityPictureURLChange.bind(this);

    
    }

  private hidePanel() {
    this.props.onDissmissPanel(false);
  }

  private async onSave() {
    let eventData: ITimelineActivity = this.state.eventData;

    let panelMode = this.props.panelMode;
    let startDate: string = null;
   
    startDate = `${moment(this.state.acivityDate).format('YYYY/MM/DD')}`;
   
    const startTime = `${this.state.startSelectedHour.key}:${this.state.startSelectedMin.key}`;
    const startDateTime = `${startDate} ${startTime}`;
    const start = moment(startDateTime, 'YYYY/MM/DD HH:mm').toLocaleString();
    eventData.acivityDate = new Date(start);
    
    
    eventData.activityDescription = this.state.activityDescription;
    eventData.acivityLink = this.state.eventData.acivityLink;

    try {
      this.setState({ isSaving: true });

      switch (panelMode) {
        case IPanelModelEnum.edit:
          await this.TimelineService.updateTimelineActivity(
            'Timeline',
            eventData           
          ).then((value: any) => { debugger;this.props.onDissmissPanel(true);});
          break;
        case IPanelModelEnum.add:
          await this.TimelineService.addTimelineActivity("Timeline", eventData).then((value: any) => { this.props.onDissmissPanel(true); });
          break;
        default:
          break;
      }
      this.setState({ isSaving: false });
     
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isSaving: false });
    }
  }

  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({ hasError: true, errorMessage: errorInfo.message });
  }

  private async renderEventData(eventId?: number) {
    
    this.setState({ isloading: true });
    const event: ITimelineActivity = !eventId ? this.props.event : await this.TimelineService.getTimelineActivity('Timeline', eventId);

    if (this.props.panelMode == IPanelModelEnum.edit && event) {
      // Get hours of event
      const startHour = moment(event.acivityDate).format('HH').toString();
      const startMin = moment(event.acivityDate).format("mm").toString();
    
      // Get Descript and covert to RichText Control
      const html = event.activityDescription;
      
      // Update Component Data
      this.setState({
        eventData: event,
        acivityDate: event.acivityDate,
        startSelectedHour: { key: startHour, text: startHour },
        startSelectedMin: { key: startMin, text: startMin },
        activityDescription: event.activityDescription,
        activityTitle: event.activityTitle,
        acivityLink: event.acivityLink,
        activityPictureUrl: event.activityPictureUrl,
        isloading: false      
      });
    }
    else {
     

      this.setState({
        acivityDate: new Date(),      
        activityDescription: '',
        activityTitle: '',
        acivityLink: '',
        activityPictureUrl: '',
        isloading: false,
        eventData: { ...event},
      });
    }
  }

  public async componentDidMount() {
    await this.renderEventData();
  }

  private onStartChangeHour = (ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ startSelectedHour: item });
  }

  private _onEventTitleChange = (ev: any, newText: string): void => {
    this.setState({ eventData: { ...this.state.eventData, activityTitle: newText } });
  }
  private _onActivityPictureURLChange = (ev: any, newText: string): void => {
   
    this.setState({ eventData: { ...this.state.eventData, activityPictureUrl: newText } });
  }
  private _onActivityLinkURLChange = (ev: any, newText: string): void => {
    
    this.setState({ eventData: { ...this.state.eventData, acivityLink: newText } });
  }
  
  

  private onStartChangeMin = (ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ startSelectedMin: item });
  }

  private onEditorStateChange = (e): void => {   
    this.setState({ activityDescription: e.target.value})
  }

  private onGetErrorMessageTitle(value: string): string {
    let returnMessage: string = '';

    if (value.length === 0) {
      returnMessage = "Error";
    }
    else {
      this.setState({ eventData: { ...this.state.eventData, activityTitle: value }, disableButton: false, errorMessage: '' });
    }
    return returnMessage;
  }
  

  
  private onDelete(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    this.setState({ displayDialog: true });
  }

  private closeDialog = (): void => {
    this.setState({ displayDialog: false });
  }

  private async confirmDelete(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    try {
      this.setState({ isDeleting: true });

      switch (this.props.panelMode) {
        case IPanelModelEnum.edit:
          await this.TimelineService.deleteTimelineActivity('Timeline',this.state.eventData);
          break;
        default:
          break;
      }
      this.setState({ isDeleting: false });
      this.props.onDissmissPanel(true);
    }
    catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isDeleting: false, displayDialog: false });
    }
  }

  private onRenderFooterContent() {
    return (
      <div >
        <DefaultButton onClick={this.hidePanel} style={{ marginBottom: '15px', float: 'right' }}>
          Cancel
        </DefaultButton>
        {
          <PrimaryButton
            disabled={this.state.disableButton}
            onClick={this.onSave}
            style={{ marginBottom: '15px', marginRight: '8px', float: 'right' }}>
            Save
          </PrimaryButton>
        }

        {
          this.state.isSaving &&
          <Spinner size={SpinnerSize.medium} style={{ marginBottom: '15px', marginRight: '8px', float: 'right' }} />
        }
      </div>
    );
  }

  private onSelectDateStart(newDate: Date) {
    this.setState({ acivityDate: newDate });
  }

  

  

  public render(): React.ReactElement<IEventProps> {
    

    return (
      <div>
        <Dialog
          isOpen={this.props.showPanel}
          dialogContentProps={{
            type: DialogType.normal,
            title:
              this.props.panelMode == 2
                ? "Edit Timeline Event"
                : "Create Timeline Event",
            showCloseButton: true,
          }}
          onDismiss={this.hidePanel}
          hidden={false}
          modalProps={{ className: styles.dialogOverride }}
        >
          <div className="ms-u-Grid ms-Grid">
            <div className="ms-u-Grid-row ms-Grid-row">
              {this.state.hasError && (
                <MessageBar messageBarType={MessageBarType.error}>
                  {this.state.errorMessage}
                </MessageBar>
              )}
              {this.state.isloading && <Spinner size={SpinnerSize.large} />}
              {!this.state.isloading && (
                <div>
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      label="Title"
                      required
                      value={
                        this.state.eventData
                          ? this.state.eventData.activityTitle
                          : ""
                      }
                      deferredValidationTime={500}
                      onChange={this._onEventTitleChange}
                    />
                  </div>
                  <Label
                    style={{ fontWeight: "bold", color: "#63666A!important" }}
                  >
                    TimeLine Date
                  </Label>
                  <React.Fragment>
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "top",
                        paddingRight: 10,
                      }}
                    >
                      <Dropdown
                        selectedKey={this.state.startSelectedHour.key}
                        onChange={this.onStartChangeHour}
                        dropdownWidth={75}
                        options={[
                          { key: "00", text: "00" },
                          { key: "01", text: "01" },
                          { key: "02", text: "02" },
                          { key: "03", text: "03" },
                          { key: "04", text: "04" },
                          { key: "05", text: "05" },
                          { key: "06", text: "06" },
                          { key: "07", text: "07" },
                          { key: "08", text: "08" },
                          { key: "09", text: "09" },
                          { key: "10", text: "10" },
                          { key: "11", text: "11" },
                          { key: "12", text: "12" },
                          { key: "13", text: "13" },
                          { key: "14", text: "14" },
                          { key: "15", text: "15" },
                          { key: "16", text: "16" },
                          { key: "17", text: "17" },
                          { key: "18", text: "18" },
                          { key: "19", text: "19" },
                          { key: "20", text: "20" },
                          { key: "21", text: "21" },
                          { key: "22", text: "22" },
                          { key: "23", text: "23" },
                        ]}
                      />
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "top",
                        paddingRight: 10,
                      }}
                    >
                      <Dropdown
                        selectedKey={this.state.startSelectedMin.key}
                        onChange={this.onStartChangeMin}
                        options={[
                          { key: "00", text: "00" },
                          { key: "05", text: "05" },
                          { key: "10", text: "10" },
                          { key: "15", text: "15" },
                          { key: "20", text: "20" },
                          { key: "25", text: "25" },
                          { key: "30", text: "30" },
                          { key: "35", text: "35" },
                          { key: "40", text: "40" },
                          { key: "45", text: "45" },
                          { key: "50", text: "50" },
                          { key: "55", text: "55" },
                        ]}
                      />
                    </div>
                  </React.Fragment>

                  <div
                    style={{
                      display: "inline-block",
                      verticalAlign: "top",
                      paddingRight: 10,
                    }}
                  >
                    <DatePicker
                      isRequired={false}
                      className={controlClass.control}
                      strings={DayPickerStrings}
                      allowTextInput={true}
                      value={new Date()}
                      onSelectDate={this.onSelectDateStart}
                      showMonthPickerAsOverlay={false}
                      isMonthPickerVisible={false}
                      showGoToToday={false}
                    />
                  </div>

                  <Label
                    style={{ fontWeight: "bold", color: "#63666A!important" }}
                  >
                    Description
                  </Label>
                  <div className={styles.description}>
                    <textarea className="ms-TextField-field" value={this.state.activityDescription} onChange={this.onEditorStateChange}></textarea>
                  </div>

                 
                  <div>
                    <TextField
                      label="Picture URL"
                      required
                      value={
                        this.state.eventData
                          ? this.state.eventData.activityPictureUrl ?  this.state.eventData.activityPictureUrl["Url"] : ''
                          : ""
                      }
                      deferredValidationTime={500}
                      onChange={this._onActivityPictureURLChange}
                    />  </div>

                 
                  
                  <div>
                    <TextField
                      label="Link URL"
                      required
                      value={
                        this.state.eventData
                          ? this.state.eventData.acivityLink ? this.state.eventData.acivityLink["Url"] :''
                          : ""
                      }
                      deferredValidationTime={500}
                      onChange={this._onActivityLinkURLChange}
                    />  </div>  
                    </div>      
              
              )}
            </div>
            {this.state.displayDialog && (
              <Dialog
                hidden={!this.state.displayDialog}
                type={DialogType.normal}
                dialogContentProps={{
                  type: DialogType.normal,
                  closeButtonAriaLabel: "Close",
                  title: "Do you want to Delete",
                  showCloseButton: true,
                }}
                onDismiss={this.closeDialog}
                modalProps={{
                  isBlocking: true,
                  styles: { main: { maxWidth: 450 } },
                }}
              >
                <Label>Do you want to Delete</Label>
                {this.state.isDeleting && (
                  <Spinner size={SpinnerSize.medium} ariaLabel="Deleting ..." />
                )}
                <DialogFooter>
                  <PrimaryButton
                    className={styles.addCreateEventBtn}
                    onClick={this.confirmDelete}
                    text="Confirm Delete"
                    disabled={this.state.isDeleting}
                  />
                  <DefaultButton
                    className={styles.cancelCreateEventBtn}
                    onClick={this.closeDialog}
                    text="Cancel"
                  />
                </DialogFooter>
              </Dialog>
            )}
            <div>
              <DefaultButton
                onClick={this.hidePanel}
                className={styles.cancelCreateEventBtn}
              >
                Cancel
              </DefaultButton>
              <PrimaryButton
                disabled={this.state.disableButton}
                onClick={this.onSave}
                className={styles.addCreateEventBtn}
                style={{
                  marginBottom: "15px",
                  marginRight: "8px",
                  float: "right",
                }}
              >
                {this.props.panelMode == 2 ? "Update Event" : "Create Event"}
              </PrimaryButton>

              {this.state.isSaving && (
                <Spinner
                  size={SpinnerSize.medium}
                  style={{
                    marginBottom: "15px",
                    marginRight: "8px",
                    float: "right",
                  }}
                />
              )}
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
