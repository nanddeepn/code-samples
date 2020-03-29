import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ITreeItemAction, TreeItemActionsDisplayStyle, IConcreteTreeItemActionProps } from './ITreeItemActions';

/**
 * Renders the controls for Button TreeItem action component
 */
export default class ButtonTreeItemAction extends React.Component<IConcreteTreeItemActionProps> {

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.checkForImmediateInvocations();
  }

  /**
   * Prepares the command bar button
   */
  private prepareCommandBarButton = (treeItemAction: ITreeItemAction): { name: string, text: string, iconName: string, btnTitle: string } => {
    let name: string = "";
    let text: string = "";
    let iconName: string = "";
    let btnTitle: string = "";

    if ((this.props.displayStyle && (this.props.displayStyle === TreeItemActionsDisplayStyle.text || this.props.displayStyle === TreeItemActionsDisplayStyle.textAndIcon))) {
      name = treeItemAction.title;
      text = treeItemAction.title;
    }

    if (this.props.displayStyle && (this.props.displayStyle === TreeItemActionsDisplayStyle.icon || this.props.displayStyle === TreeItemActionsDisplayStyle.textAndIcon)) {
      iconName = treeItemAction.iconName;
    }

    btnTitle = treeItemAction.title;

    return { name, text, iconName, btnTitle };
  }

  /**
   * Gets the action button styling
   */
  private getTreeItemActionActionButtonStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: this.props.displayStyle === TreeItemActionsDisplayStyle.icon ? "32px" : null,
      height: "32px"
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
   * On action execution
   */
  private onActionExecute = async (treeItemAction: ITreeItemAction) => {
    await treeItemAction.actionCallback(this.props.treeItem);
    this.props.treeItemActionCallback();
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IConcreteTreeItemActionProps> {
    const { treeItem, treeItemActions } = this.props;

    // Check if there are actions to show
    const actionsToShow = treeItemActions.filter(a => !a.hidden);
    if (actionsToShow && actionsToShow.length === 0) {
      return null;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        {
          treeItemActions &&
          treeItemActions.map(treeItemAction => {
            const { name, text, iconName, btnTitle } = this.prepareCommandBarButton(treeItemAction);
            return (
              treeItemAction.hidden ? (
                null
              ) : (
                  <div>
                    <CommandBarButton split={true}
                      onClick={() => { this.onActionExecute(treeItemAction); }}
                      iconProps={{
                        iconName: iconName || null,
                        style: { display: iconName ? null : "none" }
                      }}
                      text={text}
                      title={btnTitle}
                      name={name}
                      key={treeItem.key}
                      style={this.getTreeItemActionActionButtonStyle()} />
                  </div>
                )
            );
          })
        }
      </div>
    );
  }
}
