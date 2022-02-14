import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ListItemsAceAdaptiveCardExtensionStrings';
import { IListItemsAceAdaptiveCardExtensionProps, IListItemsAceAdaptiveCardExtensionState } from '../ListItemsAceAdaptiveCardExtension';
import { IListItem } from '../ListItemsAceAdaptiveCardExtension';

export interface IQuickViewData {
    title: string;
    description: string;
    details: string;
}

export class DetailedQuickView extends BaseAdaptiveCardView<
  IListItemsAceAdaptiveCardExtensionProps,
  IListItemsAceAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    const { description, title } = this.state.items[this.state.currentIndex];
    return {
        title,
        description,        
        details: 'More details'
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return {
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      type: 'AdaptiveCard',
      version: '1.2',
      body: [
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              items: [
                {
                  type: 'TextBlock',
                  text: '${title}',
                  size: 'ExtraLarge'
                },
                {
                  type: 'TextBlock',
                  text: '${description}',
                  size: 'Medium'
                }
              ]
            },
            {
              type: 'Column',
              style: 'emphasis',
              items: [
                {
                  type: 'TextBlock',
                  text: '${details}',
                  weight: 'Lighter'
                }
              ]
            }
          ]
        },
        {
          type: 'ActionSet',
          actions: [
            {
              type: 'Action.Submit',
              title: 'Back',
              data: {
                id: 'back'
              }
            }
          ]
        }
      ]
    };
  }

  public onAction(action: IActionArguments): void {
    if (action.type === 'Submit') {
      const { id } = action.data;
      if (id === 'back') {
        this.quickViewNavigator.pop();
      }
    }
  }
}
