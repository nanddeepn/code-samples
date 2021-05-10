import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IAnnouncementItem } from './IAnnouncementItem';
export interface IExpandCollapseWebPartProps {
    description: string;
}
export default class ExpandCollapseWebPart extends BaseClientSideWebPart<IExpandCollapseWebPartProps> {
    render(): void;
    private getAnnouncementDetails;
    private _setButtonEventHandlers;
    private enableExpandCollapse;
    private expandAll;
    private collapseAll;
    getAnnouncementItems(): IAnnouncementItem[];
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ExpandCollapseWebPart.d.ts.map