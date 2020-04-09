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
import { TreeItemActionsDisplayMode } from './components/ITreeItemActions';

export interface ITreeViewWebPartProps {
  description: string;
}

const skypeCheckIcon: IIconProps = { iconName: 'SkypeCheck' };

export default class TreeViewWebPart extends BaseClientSideWebPart<ITreeViewWebPartProps> {

  public render(): void {

    const element: React.ReactElement<ITreeViewProps> = React.createElement(
      TreeView,
      {
        items: [
          {
            key: "R1",
            label: "Root",
            subLabel: "This is a sub label for node",
            iconProps: skypeCheckIcon,
            actions: [{
              title: "Get item",
              iconProps: {
                iconName: 'Warning',
                style: {
                  color: 'salmon',
                },
              },
              id: "GetItem",
              actionCallback: async (treeItem: ITreeItem) => {
                console.log(treeItem);
              }
            }],
            children: [
              {
                key: "1",
                label: "Parent 1",
                selectable: false,
                children: [
                  {
                    key: "3",
                    label: "Child 1",
                    subLabel: "This is a sub label for node",
                    actions: [{
                      iconProps: {
                        iconName: 'Share'
                      },
                      id: "GetItem",
                      actionCallback: async (treeItem: ITreeItem) => {
                        console.log(treeItem);
                      }
                    }],
                    children: [
                      {
                        key: "gc1",
                        label: "Grand Child 1",
                        actions: [{
                          title: "Get Grand Child item",
                          iconProps: {
                            iconName: 'Mail'
                          },
                          id: "GetItem",
                          actionCallback: async (treeItem: ITreeItem) => {
                            console.log(treeItem);
                          }
                        }]
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
                label: "Parent 4",
                selectable: true
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
        // defaultExpanded: false,
        selectionMode: SelectionMode.Multiple,
        onExpandCollapse: this.onExpandCollapseTree,
        onSelect: this.onItemSelected,
        selectChildrenIfParentSelected: false,
        showCheckboxes: true,
        treeItemActionsDisplayMode: TreeItemActionsDisplayMode.ContextualMenu,
        defaultSelectedKeys: ['R2', '6']
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
