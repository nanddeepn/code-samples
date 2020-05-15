import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MathsLibraryConsumerWebPart.module.scss';
import * as strings from 'MathsLibraryConsumerWebPartStrings';

import * as mathsLibrary from 'spfx-maths-library';

export interface IMathsLibraryConsumerWebPartProps {
  description: string;
}

export default class MathsLibraryConsumerWebPart extends BaseClientSideWebPart<IMathsLibraryConsumerWebPartProps> {

  public render(): void {
    const mathsInstance = new mathsLibrary.MathsUtilLibrary();
    this.domElement.innerHTML = `
      <div class="${ styles.mathsLibraryConsumer}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Consume SPFx Library!</span>
                <p class="${ styles.description}">${escape(this.properties.description)}</p>
                <p class="${ styles.description}">${mathsInstance.getRandomNumber()}</p>
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
