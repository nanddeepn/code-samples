import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ITreeItemAction, IConcreteTreeItemActionProps } from './ITreeItemActions';

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
    let name: string = treeItemAction.title;
    let text: string = treeItemAction.title;
    let iconName: string = treeItemAction.iconName;
    let btnTitle: string = treeItemAction.title;

    return { name, text, iconName, btnTitle };
  }

  /**
   * Gets the action button styling
   */
  private getTreeItemActionButtonStyle = (treeItemAction: ITreeItemAction): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: treeItemAction.iconName ? "32px" : null,
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
                      style={this.getTreeItemActionButtonStyle(treeItemAction)} />
                  </div>
                )
            );
          })
        }
      </div>
    );
  }
}
