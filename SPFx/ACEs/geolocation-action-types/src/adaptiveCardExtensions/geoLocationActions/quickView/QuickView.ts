import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'GeoLocationActionsAdaptiveCardExtensionStrings';
import { IGeoLocationActionsAdaptiveCardExtensionProps, IGeoLocationActionsAdaptiveCardExtensionState } from '../GeoLocationActionsAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IGeoLocationActionsAdaptiveCardExtensionProps,
  IGeoLocationActionsAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title
    };
  }

  public onAction(action: IActionArguments): void {
    if (action.type === 'VivaAction.GetLocation') {
      console.log(action.location.latitude);
      console.log(action.location.longitude);
    }
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}