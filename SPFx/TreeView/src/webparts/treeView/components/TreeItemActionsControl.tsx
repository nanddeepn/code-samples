import * as React from 'react';
import { ITreeItemAction, ITreeItemActionsControlProps, ITreeItemActionsControlState, TreeItemActionsDisplayMode, TreeItemActionsDisplayStyle } from './ITreeItemActions';
import { DropdownTreeItemAction } from './DropdownTreeItemAction';
import ButtonTreeItemAction from './ButtonTreeItemAction';

/**
 * Renders the controls for TreeItem actions component
 */
export default class TreeItemActionsControl extends React.Component<ITreeItemActionsControlProps, ITreeItemActionsControlState> {

    /**
     * Constructor method
     * @param props properties interface
     */
    constructor(props: ITreeItemActionsControlProps) {
        super(props);

        const { treeItemActions } = this.props;

        const displayMode = treeItemActions.treeItemActionsDisplayMode ? treeItemActions.treeItemActionsDisplayMode : TreeItemActionsDisplayMode.Buttons;
        const displayStyle = treeItemActions.treeItemActionsDisplayStyle ? treeItemActions.treeItemActionsDisplayStyle : TreeItemActionsDisplayStyle.Text;

        this.state = {
            availableActions: [],
            displayMode,
            displayStyle
        };
    }

    /**
     * componentWillMount lifecycle hook
     */
    public componentWillMount(): void {
        this.getAvailableActions();
    }

    /**
     * Get the available treeItem actions
     */
    private async getAvailableActions(): Promise<void> {
        const { treeItem, treeItemActions } = this.props;

        // Prepare list of the available actions
        const availableActions: ITreeItemAction[] = [];

        if (treeItemActions.actions) {
            for (const action of treeItemActions.actions) {
                const available = await action.applyToTreeItem(treeItem);

                if (available) {
                    availableActions.push(action);
                }
            }
        }

        this.setState({
            availableActions
        });
    }

    /**
     * Default React render method
     */
    public render(): React.ReactElement<ITreeItemActionsControlProps> {
        const { treeItem } = this.props;
        const { displayStyle, displayMode, availableActions } = this.state;

        if (!availableActions || availableActions.length <= 0 || !treeItem) {
            return null;
        }

        return (
            <div>
                {
                    displayMode == TreeItemActionsDisplayMode.ContextualMenu ?
                        <DropdownTreeItemAction key={`DdAction-${treeItem.key}`} treeItemActions={availableActions} treeItem={treeItem} displayStyle={displayStyle} treeItemActionCallback={this.props.treeItemActionCallback} />
                        :
                        <ButtonTreeItemAction key={`BtnAction-${treeItem.key}`} treeItemActions={availableActions} treeItem={treeItem} displayStyle={displayStyle} treeItemActionCallback={this.props.treeItemActionCallback} />
                }
            </div>
        );
    }
}
