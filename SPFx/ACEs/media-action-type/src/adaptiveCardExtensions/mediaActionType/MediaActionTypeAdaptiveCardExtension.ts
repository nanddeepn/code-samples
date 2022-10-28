import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MediaActionTypePropertyPane } from './MediaActionTypePropertyPane';
import FileUploadService from '../../services/FileUploadService';

export interface IMediaActionTypeAdaptiveCardExtensionProps {
  title: string;
}

export interface IMediaActionTypeAdaptiveCardExtensionState {
  filesUploaded: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'MediaActionType_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MediaActionType_QUICK_VIEW';

export default class MediaActionTypeAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMediaActionTypeAdaptiveCardExtensionProps,
  IMediaActionTypeAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MediaActionTypePropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { 
      filesUploaded: ''
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    FileUploadService.setup(this.context);

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MediaActionType-property-pane'*/
      './MediaActionTypePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MediaActionTypePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
