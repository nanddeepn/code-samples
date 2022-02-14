import {
    BaseBasicCardView,
    IActionArguments,
    IBasicCardParameters,
    ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import { IListItemsAceAdaptiveCardExtensionProps, IListItemsAceAdaptiveCardExtensionState, IListItem, QUICK_VIEW_REGISTRY_ID } from '../ListItemsAceAdaptiveCardExtension';


// Extend from BaseBasicCardView
export class MediumCardView extends BaseBasicCardView<IListItemsAceAdaptiveCardExtensionProps, IListItemsAceAdaptiveCardExtensionState> {
    // Use the Card button to open the Quick View
    public get cardButtons(): [ICardButton] {
        return [
            {
                title: 'View All',
                action: {
                    type: 'QuickView',
                    parameters: {
                        view: QUICK_VIEW_REGISTRY_ID
                    }
                }
            }
        ];
    }

    // Display the total number of steps
    public get data(): IBasicCardParameters {
        return {
            primaryText: `${this.state.items.length} Steps`
        };
    }
}