import {
  BaseBasicCardView,
  IBasicCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'BasicCardAdaptiveCardExtensionStrings';
import { IBasicCardAdaptiveCardExtensionProps, IBasicCardAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../BasicCardAdaptiveCardExtension';

export class CardView extends BaseBasicCardView<IBasicCardAdaptiveCardExtensionProps, IBasicCardAdaptiveCardExtensionState> {
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
      },
      {
        title: 'Microsoft',
        action: {
          type: 'ExternalLink',
          parameters: {
            target: 'https://www.microsoft.com'
          }
        }
      }
    ];
  }

  public get data(): IBasicCardParameters {
    return {
      primaryText: strings.PrimaryText
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
