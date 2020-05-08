import * as React from 'react';
import styles from './TreeViewDemo.module.scss';
import { ITreeViewDemoProps } from './ITreeViewDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TreeView, ITreeItem, TreeViewSelectionMode, TreeItemActionsDisplayMode } from "@pnp/spfx-controls-react/lib/TreeView";

export default class TreeViewDemo extends React.Component<ITreeViewDemoProps, {}> {
  private treeItems = [
    {
      key: "R1",
      label: "Root",
      subLabel: "This is a sub label for node",
      iconProps: {
        iconName: 'SkypeCheck'
      },
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
                title: "Share",
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
              iconProps: {
                iconName: 'SkypeCheck'
              }
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
  ];

  public render(): React.ReactElement<ITreeViewDemoProps> {
    return (
      <div className={styles.treeViewDemo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Tree View PnP Control</span>

              <TreeView
                items={this.treeItems}
                defaultExpanded={false}
                selectionMode={TreeViewSelectionMode.Multiple}
                selectChildrenIfParentSelected={true}
                showCheckboxes={true}
                treeItemActionsDisplayMode={TreeItemActionsDisplayMode.ContextualMenu}
                defaultSelectedKeys={['R2', '6']}
                onExpandCollapse={this.onExpandCollapseTree}
                onSelect={this.onItemSelected}
                onRenderItem={this.renderCustomTreeItem} />
                
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onExpandCollapseTree(item: ITreeItem, isExpanded: boolean) {
    console.log((isExpanded ? "item expanded: " : "item collapsed: ") + item.label);
  }

  private onItemSelected(items: ITreeItem[]) {
    console.log("items selected: " + items.length);
  }

  private renderCustomTreeItem(item: ITreeItem): JSX.Element {
    return (
      <span>
        {
          item.iconProps &&
          <i className={"ms-Icon ms-Icon--" + item.iconProps.iconName} style={{ paddingRight: '4px' }} />
        }
        {item.label}
      </span>
    );
  }
}
