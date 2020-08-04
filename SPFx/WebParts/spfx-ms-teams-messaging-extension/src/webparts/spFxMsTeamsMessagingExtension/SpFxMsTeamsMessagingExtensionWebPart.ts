import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxMsTeamsMessagingExtensionWebPartStrings';
import SpFxMsTeamsMessagingExtension from './components/SpFxMsTeamsMessagingExtension';
import { ISpFxMsTeamsMessagingExtensionProps } from './components/ISpFxMsTeamsMessagingExtensionProps';

export interface ISpFxMsTeamsMessagingExtensionWebPartProps {
  description: string;
}

export default class SpFxMsTeamsMessagingExtensionWebPart extends BaseClientSideWebPart<ISpFxMsTeamsMessagingExtensionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxMsTeamsMessagingExtensionProps> = React.createElement(
      SpFxMsTeamsMessagingExtension,
      {
        description: this.properties.description,
        host: (this.context as any)._host,
        teamsContext: this.context.microsoftTeams
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
