import * as React from 'react';
import styles from './FaceliftDropdown.module.scss';
import { IFaceliftDropdownProps } from './IFaceliftDropdownProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class FaceliftDropdown extends React.Component<IFaceliftDropdownProps, {}> {
  private dropdownOptions: { key: string, text: string, data: any }[] = [];

  public constructor(props) {
    super(props);

    // Colors
    // this.dropdownOptions.push({ key: "Red", text: "Red", data: { icon: 'CircleShapeSolid', colorName: "#ff0000" } });
    // this.dropdownOptions.push({ key: "Green", text: "Green", data: { icon: 'CircleShapeSolid', colorName: "#00ff00" } });
    // this.dropdownOptions.push({ key: "Blue", text: "Blue", data: { icon: 'CircleShapeSolid', colorName: "#0000ff" } });
    // this.dropdownOptions.push({ key: "Purple", text: "Purple", data: { icon: 'CircleShapeSolid', colorName: "#800080" } });
    // this.dropdownOptions.push({ key: "Orange", text: "Orange", data: { icon: 'CircleShapeSolid', colorName: "#ffa500" } });

    // Commuting modes
    // this.dropdownOptions.push({ key: "Running", text: "Running", data: { icon: "Running", colorName: "#201584" } });
    // this.dropdownOptions.push({ key: "Cycling", text: "Cycling", data: { icon: "Cycling", colorName: "#ffa500" } });
    // this.dropdownOptions.push({ key: "Train", text: "Train", data: { icon: "TrainSolid", colorName: "#FF00FF" } });
    // this.dropdownOptions.push({ key: "Bus", text: "Bus", data: { icon: "BusSolid", colorName: "#ff0000" } });
    // this.dropdownOptions.push({ key: "Ferry", text: "Ferry", data: { icon: "FerrySolid", colorName: "#0000FF" } });
    // this.dropdownOptions.push({ key: "Airplane", text: "Airplane", data: { icon: "AirplaneSolid", colorName: "#00CC66" } });
    // this.dropdownOptions.push({ key: "Car", text: "Car", data: { icon: "ParkingMirroredSolid", colorName: "#7e8509" } });

    // Office 365 Apps
    this.dropdownOptions.push({
      key: "SharePoint",
      text: "SharePoint",
      data: { icon: "SharepointAppIcon16", colorName: "#0B828C" }
    });

    this.dropdownOptions.push({
      key: "OneDrive",
      text: "OneDrive",
      data: { icon: "OneDriveLogo", colorName: "#0364b8" }
    });

    this.dropdownOptions.push({
      key: "OneNote",
      text: "OneNote",
      data: { icon: "OneNoteEduLogoInverse", colorName: "#7719aa" }
    });

    this.dropdownOptions.push({
      key: "Teams",
      text: "Teams",
      data: { icon: "TeamsLogo16", colorName: "#4b53bc" }
    });

    this.dropdownOptions.push({
      key: "Forms",
      text: "Forms",
      data: { icon: "OfficeFormsLogo16", colorName: "#035a5d" }
    });

    this.dropdownOptions.push({
      key: "Stream",
      text: "Stream",
      data: { icon: "StreamLogo", colorName: "#af1946" }
    });

    this.dropdownOptions.push({
      key: "PowerApps",
      text: "Power Apps",
      data: { icon: "PowerApps", colorName: "#5c0e68" }
    });

    this.dropdownOptions.push({
      key: "PowerBI",
      text: "Power BI",
      data: { icon: "PowerBILogo", colorName: "#fdc941" }
    });

    this.dropdownOptions.push({
      key: "PowerAutomate",
      text: "Power Automate",
      data: { icon: "MicrosoftFlowLogo", colorName: "#0077ff" }
    });
  }

  public render(): React.ReactElement<IFaceliftDropdownProps> {
    return (
      <div className={styles.faceliftDropdown}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>

              <Dropdown
                label="Office 365 Apps"
                onChange={this.onSelectionChanged}
                onRenderTitle={this.onRenderTitle}
                onRenderOption={this.onRenderOption}
                onRenderCaretDown={this.onRenderCaretDown}
                options={this.dropdownOptions}
              />

            </div>
          </div>
        </div>
      </div>
    );
  }

  private onRenderOption(option: IDropdownOption): JSX.Element {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px', color: option.data.colorName }} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  private onRenderTitle(options: IDropdownOption[]): JSX.Element {
    const option = options[0];

    return (
      <div>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px', color: option.data.colorName }} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  private onRenderCaretDown(props: IDropdownProps): JSX.Element {
    return <Icon iconName="CirclePlus" />;
  }

  private onSelectionChanged(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    console.log(item.key.toString() + ": " + item.text);
  }
}
