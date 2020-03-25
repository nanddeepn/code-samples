import { ITreeItem } from './ITreeItem';

export interface ITreeViewState {
    loaded: boolean;
    defaultExpanded: boolean;
    activeItems: ITreeItem[];
}