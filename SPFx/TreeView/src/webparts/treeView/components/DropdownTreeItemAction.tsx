import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { ITreeItem } from './ITreeItem';
import { ITreeItemAction, IConcreteTreeItemActionProps } from './ITreeItemActions';

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
    let useTargetWidth = true;

    for (const treeItemAction of treeItemActions) {
      if (!treeItemAction.hidden) {
        let treeItemActionMenuItem: IContextualMenuItem = {
          key: treeItem.key.toString(),
          onClick: () => { this.onActionExecute(treeItemAction); }
        };

        treeItemActionMenuItem.text = treeItemAction.title;
        treeItemActionMenuItem.name = treeItemAction.title;
        treeItemActionMenuItem.iconProps = treeItemAction.iconProps;
        useTargetWidth = treeItemActionMenuItem.iconProps ? false : true;

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

    const moreVerticalIcon: IIconProps = { iconName: 'MoreVertical' };
    const treeItemActionButtonStyle = this.getTreeItemActionActionButtonStyle();
    const contextualMenuProps = this.prepareContextualMenuProps(treeItem, treeItemActions);

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        <IconButton
          menuProps={contextualMenuProps}
          iconProps={moreVerticalIcon}
          style={treeItemActionButtonStyle}
          title="More"
          ariaLabel="More"
        />
      </div>
    );
  }
}
