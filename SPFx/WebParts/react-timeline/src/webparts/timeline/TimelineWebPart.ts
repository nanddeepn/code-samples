import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField, PropertyPaneDropdown, PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TimelineWebPartStrings';
import Timeline from './components/Timeline';
import { ITimelineProps } from './components/ITimelineProps';
import TimelineService from '../../services/TimelineService';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface ITimelineWebPartProps {
  description: string;
  listName: string;
  layout: string;
  showImage: boolean;
  showDescription: boolean;
  dateFormat : string;
}

export default class TimelineWebPart extends BaseClientSideWebPart <ITimelineWebPartProps> {
  private TimelineService: TimelineService = null;

  protected onInit(): Promise<void> {    
      this.TimelineService = new TimelineService(this.context);
      return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<ITimelineProps> = React.createElement(
      Timeline,
      {
        context: this.context,
        description: this.properties.description || 'TimeLine Events',
        listName: this.properties.listName || 'Timeline',
        layout: this.properties.layout || 'Vertical',
        showImage: this.properties.showImage || true,
        showDescription: this.properties.showDescription || true,
        dateFormat: this.properties.dateFormat || 'dddd, MMMM Do YYYY, h:mm:ss a'
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
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneDropdown('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [                   
                    { key: 'Vertical', text: 'Vertical' },
                    { key: 'Horizontal', text: 'Horizontal' }            
                  ]
                }),
                PropertyPaneToggle('showImage', {
                  label: strings.ShowImageFieldLabel,checked:true
                }),
                PropertyPaneToggle('showDescription', {
                  label: strings.ShowDescriptionFieldLabel, checked: true
                }),
                PropertyPaneTextField('dateFormat', {
                  label: strings.DateFormatFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
