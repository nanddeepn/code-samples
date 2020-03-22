import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TreeViewWebPartStrings';
import TreeView from './components/TreeView';
import { ITreeViewProps } from './components/ITreeViewProps';
import { ITreeItem } from './components/ITreeItem';

export interface ITreeViewWebPartProps {
  description: string;
}

export default class TreeViewWebPart extends BaseClientSideWebPart<ITreeViewWebPartProps> {

  public render(): void {
    var treeItems: Array<ITreeItem> = new Array<ITreeItem>();
    treeItems.push({ Id: "0", Name: "A", IsRoot: true });
    treeItems.push({ Id: "1", Name: "B", ParentId: "0" });
    treeItems.push({ Id: "2", Name: "C", ParentId: "0" });
    treeItems.push({ Id: "3", Name: "D", ParentId: "1" });
    treeItems.push({ Id: "4", Name: "E", ParentId: "1" });
    treeItems.push({ Id: "5", Name: "F", ParentId: "0" });
    treeItems.push({ Id: "6", Name: "G", ParentId: "0" });

    const element: React.ReactElement<ITreeViewProps> = React.createElement(
      TreeView,
      {
        TermItems: treeItems,
        defaultCollapsed:true
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
