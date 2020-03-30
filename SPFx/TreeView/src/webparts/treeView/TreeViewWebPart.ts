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
import { TreeItemActionsDisplayMode, TreeItemActionsDisplayStyle } from './components/ITreeItemActions';

export interface ITreeViewWebPartProps {
  description: string;
}

const skypeCheckIcon: IIconProps = { iconName: 'SkypeCheck' };

export default class TreeViewWebPart extends BaseClientSideWebPart<ITreeViewWebPartProps> {

  public render(): void {

    // var treeItems: Array<ITreeItem> = new Array<ITreeItem>();
    // treeItems.push({ key: "0", label: "Root", subLabel: "This is a sub label for node" });
    // treeItems.push({ key: "1", label: "Parent 1", parentKey: "0" });
    // treeItems.push({ key: "2", label: "Parent 2", parentKey: "0" });
    // treeItems.push({ key: "3", label: "Child 1", parentKey: "1", disabled: true, subLabel: "This is a sub label for node" });
    // treeItems.push({ key: "4", label: "Child 2", parentKey: "1", iconProps: skypeCheckIcon });
    // treeItems.push({ key: "5", label: "Parent 3", parentKey: "0" });
    // treeItems.push({ key: "6", label: "Parent 4", parentKey: "0" });

    const element: React.ReactElement<ITreeViewProps> = React.createElement(
      TreeView,
      {
        items: [
          {
            key: "R1",
            label: "Root",
            subLabel: "This is a sub label for node",
            children: [
              {
                key: "1",
                label: "Parent 1",
                children: [
                  {
                    key: "3",
                    label: "Child 1",
                    subLabel: "This is a sub label for node",
                    children: [
                      {
                        key: "gc1",
                        label: "Grand Child 1"
                      }
                    ]
                  },
                  {
                    key: "4",
                    label: "Child 2",
                    iconProps: skypeCheckIcon
                  }
                ]
              },
              {
                key: "2",
                label: "Parent 2"
              },
              {
                key: "5",
                label: "Parent 3",
                disabled: true
              },
              {
                key: "6",
                label: "Parent 4"
              }
            ]
          },
          {
            key: "R2",
            label: "Root 2",
            children: [
              {
                key: "8",
                label: "Parent 5"
              }
            ]
          }
        ],
        defaultExpanded: false,
        selectionMode: SelectionMode.Multiple,
        onExpandCollapse: this.onExpandCollapseTree,
        onSelect: this.onItemSelected,
        treeItemActions: {
          actions: [{
            title: "Get item",
            iconName: "LocaleLanguage",
            id: "GetItem",
            actionCallback: async (treeItem: ITreeItem) => {
              console.log(treeItem);
            },
            applyToTreeItem: (treeItem: ITreeItem) => (true)
          }],
          treeItemActionsDisplayMode: TreeItemActionsDisplayMode.dropdown,
          treeItemActionsDisplayStyle: TreeItemActionsDisplayStyle.textAndIcon
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private onExpandCollapseTree(item: ITreeItem, isExpanded: boolean) {
    console.log((isExpanded ? "item expanded: " : "item collapsed: ") + item);
  }

  private onItemSelected(items: ITreeItem[]) {
    console.log("items selected: " + items.length);
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
