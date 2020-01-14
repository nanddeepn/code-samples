import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MyTeamsPersonalAppWebPart.module.scss';
import * as strings from 'MyTeamsPersonalAppWebPartStrings';

export interface IMyTeamsPersonalAppWebPartProps {
  description: string;
}

export default class MyTeamsPersonalAppWebPart extends BaseClientSideWebPart<IMyTeamsPersonalAppWebPartProps> {

public render(): void {
  let title: string = '';
  let subTitle: string = '';
  let siteTabTitle: string = '';

  if (this.context.sdks.microsoftTeams) {
    // We have teams context for the web part
    title = "Welcome to Teams!";
    subTitle = "Building custom enterprise tabs for your business.";
    siteTabTitle = "We are in the context of following Team: " + this.context.sdks.microsoftTeams.context.teamName;
  }
  else {
    // We are rendered in normal SharePoint context
    title = "Welcome to SharePoint!";
    subTitle = "Customize SharePoint experiences using Web Parts.";
    siteTabTitle = "We are in the context of following site: " + this.context.pageContext.web.title;
  }

  this.domElement.innerHTML = `
  <div class="${ styles.myTeamsPersonalApp}">
    <div class="${ styles.container}">
      <div class="${ styles.row}">
        <div class="${ styles.column}">
          <span class="${ styles.title}">${title}</span>
          <p class="${ styles.subTitle}">${subTitle}</p>
          <p class="${ styles.description}">${siteTabTitle}</p>
          <p class="${ styles.description}">Description property value - ${escape(this.properties.description)}</p>
          <a href="https://aka.ms/spfx" class="${ styles.button}">
            <span class="${ styles.label}">Learn more</span>
          </a>
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
