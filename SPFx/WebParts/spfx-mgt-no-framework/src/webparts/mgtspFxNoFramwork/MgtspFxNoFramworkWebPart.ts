import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';
// import styles from './MgtspFxNoFramworkWebPart.module.scss';
import * as strings from 'MgtspFxNoFramworkWebPartStrings';

export interface IMgtspFxNoFramworkWebPartProps {
  description: string;
}

export default class MgtspFxNoFramworkWebPart extends BaseClientSideWebPart<IMgtspFxNoFramworkWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div>
        <mgt-person-card person-query="me"></mgt-person-card>
      </div>`;
  }

  protected async onInit(): Promise<void> {
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }

    return super.onInit();
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
