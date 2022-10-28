import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MediaActionTypeAdaptiveCardExtensionStrings';
import { IMediaActionTypeAdaptiveCardExtensionProps, IMediaActionTypeAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MediaActionTypeAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IMediaActionTypeAdaptiveCardExtensionProps, IMediaActionTypeAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: strings.PrimaryText,
      description: strings.Description,
      title: this.properties.title
    };
  }
}
