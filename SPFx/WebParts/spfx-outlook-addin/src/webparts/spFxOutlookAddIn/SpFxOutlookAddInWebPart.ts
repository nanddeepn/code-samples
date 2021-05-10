import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxOutlookAddInWebPart.module.scss';
import * as strings from 'SpFxOutlookAddInWebPartStrings';

export interface ISpFxOutlookAddInWebPartProps {
  description: string;
}

export default class SpFxOutlookAddInWebPart extends BaseClientSideWebPart<ISpFxOutlookAddInWebPartProps> {

  public render(): void {
    let title: string = "";
    let subTitle: string = "";
    let contextInfo: string = "";

    if (this.context.sdks.office) {
      // Office context
      title = "Welcome to Office!";
      subTitle = "Extending Office with SPFx.";
      contextInfo = "Email: " + this.context.sdks.office.context.mailbox.userProfile.emailAddress;
    }
    else {
      // SharePoint context
      title = "Welcome to SharePoint!";
      subTitle = "Customize SharePoint experiences using Web Parts.";
      contextInfo = "SharePoint site: " + this.context.pageContext.web.title;
    }

    this.domElement.innerHTML = `
      <div class="${ styles.spFxOutlookAddIn}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">${title}</span>
              <p class="${ styles.subTitle}">${subTitle}</p>
              <p class="${ styles.description}">${contextInfo}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
