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
import { ITreeViewProps, SelectionMode } from './components/ITreeViewProps';
import { ITreeItem } from './components/ITreeItem';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';

export interface ITreeViewWebPartProps {
  description: string;
}

const skypeCheckIcon: IIconProps = { iconName: 'SkypeCheck' };

export default class TreeViewWebPart extends BaseClientSideWebPart<ITreeViewWebPartProps> {

  public render(): void {
    var treeItems: Array<ITreeItem> = new Array<ITreeItem>();
    treeItems.push({ key: "0", label: "A" });
    treeItems.push({ key: "1", label: "B", parentKey: "0" });
    treeItems.push({ key: "2", label: "C", parentKey: "0" });
    treeItems.push({ key: "3", label: "D", parentKey: "1", disabled: true });
    treeItems.push({ key: "4", label: "E", parentKey: "1", iconProps: skypeCheckIcon });
    treeItems.push({ key: "5", label: "F", parentKey: "0" });
    treeItems.push({ key: "6", label: "G", parentKey: "0" });

    const element: React.ReactElement<ITreeViewProps> = React.createElement(
      TreeView,
      {
        items: treeItems,
        defaultExpanded: false,
        selectionMode: SelectionMode.Multiple,
        onExpandCollapse: this.onExpandCollapseTree,
        onSelect:this.onItemSelected
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private onExpandCollapseTree(item: ITreeItem, isExpanded: boolean) {
    console.log(item);
  }

  private onItemSelected(item:ITreeItem, isSelected: boolean){
    console.log("itemselected");
    console.log(item);
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
