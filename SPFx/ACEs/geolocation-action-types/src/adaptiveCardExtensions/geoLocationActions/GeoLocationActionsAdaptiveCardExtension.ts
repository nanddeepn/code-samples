import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { GeoLocationActionsPropertyPane } from './GeoLocationActionsPropertyPane';

export interface IGeoLocationActionsAdaptiveCardExtensionProps {
  title: string;
}

export interface IGeoLocationActionsAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'GeoLocationActions_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'GeoLocationActions_QUICK_VIEW';

export default class GeoLocationActionsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IGeoLocationActionsAdaptiveCardExtensionProps,
  IGeoLocationActionsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: GeoLocationActionsPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'GeoLocationActions-property-pane'*/
      './GeoLocationActionsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.GeoLocationActionsPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
