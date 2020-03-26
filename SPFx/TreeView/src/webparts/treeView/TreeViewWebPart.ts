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
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { autobind } from 'office-ui-fabric-react';

export interface ITreeViewWebPartProps {
  description: string;
}

const skypeCheckIcon: IIconProps = { iconName: 'SkypeCheck' };

export default class TreeViewWebPart extends BaseClientSideWebPart<ITreeViewWebPartProps> {

  public render(): void {

    let customActions: IContextualMenuItem[] = [
      {
        key: 'option1',
        text: 'Add Section',
        onClick: this.option1Click.bind(this)
      },
      {
        key: 'option2',
        text: 'Add Question',
        onClick: this.option2Click.bind(this)
      }
    ];

    var treeItems: Array<ITreeItem> = new Array<ITreeItem>();
    treeItems.push({ key: "0", label: "Root", subLabel: "This is a sub label for node", actions: customActions});
    treeItems.push({ key: "1", label: "Parent 1", parentKey: "0", actions: customActions });
    treeItems.push({ key: "2", label: "Parent 2", parentKey: "0", actions: customActions });
    treeItems.push({ key: "3", label: "Child 1", parentKey: "1", disabled: true, subLabel: "This is a sub label for node" });
    treeItems.push({ key: "4", label: "Child 2", parentKey: "1", iconProps: skypeCheckIcon });
    treeItems.push({ key: "5", label: "Parent 3", parentKey: "0", actions: customActions });
    treeItems.push({ key: "6", label: "Parent 4", parentKey: "0" });

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

  @autobind
  private option1Click(source: string) {
    console.log("option1 clicked");
  }

  @autobind
  private option2Click(source: string) {
    console.log("option2 clicked");
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
