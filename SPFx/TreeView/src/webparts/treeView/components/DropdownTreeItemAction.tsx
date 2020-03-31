import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ITreeItem } from './ITreeItem';
import { ITreeItemAction, TreeItemActionsDisplayStyle, IConcreteTreeItemActionProps } from './ITreeItemActions';
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';

/**
 * Renders the controls for Dropdown TreeItem action component
 */
export class DropdownTreeItemAction extends React.Component<IConcreteTreeItemActionProps> {

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.checkForImmediateInvocations();
  }

  /**
   * Prepates contextual menu items for dropdown.
   */
  private prepareContextualMenuProps = (treeItem: ITreeItem, treeItemActions: ITreeItemAction[]): IContextualMenuProps => {
    let items: IContextualMenuItem[] = [];
    const displayStyle = this.props.displayStyle;
    let useTargetWidth = true;

    for (const treeItemAction of treeItemActions) {
      if (!treeItemAction.hidden) {
        let treeItemActionMenuItem: IContextualMenuItem = {
          key: treeItem.key.toString(),
          onClick: () => { this.onActionExecute(treeItemAction); }
        };

        if (displayStyle && (displayStyle === TreeItemActionsDisplayStyle.Text || displayStyle === TreeItemActionsDisplayStyle.TextAndIcon)) {
          treeItemActionMenuItem.text = treeItemAction.title;
          treeItemActionMenuItem.name = treeItemAction.title;
          useTargetWidth = false;
        }
        
        if (displayStyle && (displayStyle === TreeItemActionsDisplayStyle.Icon || displayStyle === TreeItemActionsDisplayStyle.TextAndIcon)) {
          treeItemActionMenuItem.iconProps = { iconName: treeItemAction.iconName };
        }

        items.push(treeItemActionMenuItem);
      }
    }

    const contextualMenuProps: IContextualMenuProps = {
      items,
      useTargetWidth
    };
    return contextualMenuProps;
  }

  /**
   * Prepare treeItem action button style.
   */
  private getTreeItemActionActionButtonStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: "14px",
      display: "inline-flex",
      padding: "0px"
    };

    return result;
  }

  /**
   * Check if there are action to immediatly invoke
   */
  private checkForImmediateInvocations() {
    const { treeItemActions } = this.props;
    for (const action of treeItemActions) {
      if (action.invokeActionOnRender) {
        this.onActionExecute(action);
      }
    }
  }

  /**
   * Handler to execute selected action.
   */
  private onActionExecute = async (treeItemAction: ITreeItemAction) => {
    const updateAction = await treeItemAction.actionCallback(this.props.treeItem);
    this.props.treeItemActionCallback();
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IConcreteTreeItemActionProps> {
    const { treeItem, treeItemActions } = this.props;

    const treeItemActionButtonStyle = this.getTreeItemActionActionButtonStyle();
    const contextualMenuProps = this.prepareContextualMenuProps(treeItem, treeItemActions);

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        <DefaultButton style={treeItemActionButtonStyle} menuProps={contextualMenuProps} />
      </div>
    );
  }
}
