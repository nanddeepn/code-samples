import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ListItemsAceAdaptiveCardExtensionStrings';
import { IListItemsAceAdaptiveCardExtensionProps, IListItemsAceAdaptiveCardExtensionState } from '../ListItemsAceAdaptiveCardExtension';
import { IListItem } from '../ListItemsAceAdaptiveCardExtension';
import { DETAILED_QUICK_VIEW_REGISTRY_ID } from '../ListItemsAceAdaptiveCardExtension';

export interface IQuickViewData {
  items: IListItem[];
}

export class QuickView extends BaseAdaptiveCardView<
  IListItemsAceAdaptiveCardExtensionProps,
  IListItemsAceAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      items: this.state.items
    };
  }

  // public get template(): ISPFxAdaptiveCard {
  //   return require('./template/QuickViewTemplate.json');
  // }

  public get template(): ISPFxAdaptiveCard {
    return {
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      type: 'AdaptiveCard',
      version: '1.2',
      body: [
        {
          type: 'Container',
          $data: '${items}', // Bind each item to a template in `items`
          selectAction: { // Action to handle an item click
            type: 'Action.Submit',
            data: {
              /*
               * Define `id` inside of `data` since each item will
               * have the same `selectAction` and the `selectAction.id`
               * property has to be unique between all items.
               */
              id: 'selectAction',
              newIndex: '${$index}',
            }
          },
          separator: true,
          items: [ // The template for an item in `items`
            {
              type: 'TextBlock',
              text: '${title}',
              color: 'dark',
              weight: 'Bolder',
              size: 'large',
              wrap: true,
              maxLines: 1,
              spacing: 'None'
            },
            {
              type: 'TextBlock',
              text: '${description}',
              color: 'dark',
              wrap: true,
              size: 'medium',
              maxLines: 1,
              spacing: 'None'
            }
          ]
        }
      ]
    };
  }

  public onAction(action: IActionArguments): void {
    if (action.type === 'Submit') {
      const { id, newIndex } = action.data;
      if (id === 'selectAction') {
        this.quickViewNavigator.push(DETAILED_QUICK_VIEW_REGISTRY_ID, true);
        this.setState({ currentIndex: newIndex});
      }
    }
  }
}