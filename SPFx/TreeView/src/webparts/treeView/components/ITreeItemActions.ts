import { ITreeItem } from './ITreeItem';

/**
 * Specifies the display mode of the tree item actions.
 */
export enum TreeItemActionsDisplayMode {
    buttons = 1,
    dropdown
}

/**
 * Specifies the style which is applied to display actions.
 */
export enum TreeItemActionsDisplayStyle {
    text = 1,
    icon,
    textAndIcon
}

/**
 * Tree item actions.
 */
export interface ITreeItemActions {
    /**
     * List of actions.
     */
    actions: ITreeItemAction[];
    /**
     * Style applied to display actions.
     */
    treeItemActionsDisplayStyle?: TreeItemActionsDisplayStyle;
    /**
     * Display mode of the tree item actions.
     */
    treeItemActionsDisplayMode?: TreeItemActionsDisplayMode;
}

/**
 * TreeItemActionsControl properties interface
 */
export interface ITreeItemActionsControlProps {
    /**
     * Current tree item.
     */
    treeItem: ITreeItem;
    /**
     * List of actions.
     */
    treeItemActions: ITreeItemActions;
    /**
     * Callback after execution of tree item action.
     */
    treeItemActionCallback: () => void;
}

/**
 * TreeItemActionsControl state interface
 */
export interface ITreeItemActionsControlState {
    /**
     * Specifies the list of the available actions for the tree item.
     */
    availableActions: ITreeItemAction[];
    /**
     * TreeItemAction display mode.
     */
    displayMode: TreeItemActionsDisplayMode;
    /**
     * Specifies how the concreate tree item action is going to be displayed (icon/text/both).
     */
    displayStyle: TreeItemActionsDisplayStyle;
}

/**
 * ConcreteTreeItemAction properties interface
 */
export interface IConcreteTreeItemActionProps {
    /**
     * Specifies the list of the available actions for the tree item.
     */
    treeItemActions: ITreeItemAction[];
    /**
     * Current tree item
     */
    treeItem: ITreeItem;
    /**
     * TreeItemAction display style.
     */
    displayStyle: TreeItemActionsDisplayStyle;

    /**
     * Method to be executed when action is fired.
     */
    treeItemActionCallback: () => void;
}

/**
 * Interface represents the possible action that could be execute on tree item level.
 */
export interface ITreeItemAction {
    /**
     * Action ID
     */
    id: string;
    /**
     * Action title
     */
    title: string;
    /**
     * Icon class name to be displayed for the action.
     */
    iconName?: string;
    /**
     * Specify if the action is hidden. This could be used for instance when you want to invoke the action right after rendering.
     */
    hidden?: boolean;
    /**
     * Specifies if you want to invoke the action on render
     */
    invokeActionOnRender?: boolean;

    /**
    * Method checks if the current tree item is supported.
    * @param currentTreeItem
    */
    applyToTreeItem?: (currentTreeItem: ITreeItem) => Promise<boolean> | boolean;
    /**
     * Method to be executed when action is fired.
     *  @param currentTreeItem
     */
    actionCallback: (currentTreeItem: ITreeItem) => void;
}
