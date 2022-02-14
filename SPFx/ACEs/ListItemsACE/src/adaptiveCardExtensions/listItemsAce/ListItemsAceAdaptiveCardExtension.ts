import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { MediumCardView } from './cardView/MediumCardView';
import { QuickView } from './quickView/QuickView';
import { DetailedQuickView } from './quickView/DetailedQuickView';
import { ListItemsAcePropertyPane } from './ListItemsAcePropertyPane';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IListItem {
  title: string;
  description: string;
}

export interface IListItemsAceAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
  listId: string;
}

export interface IListItemsAceAdaptiveCardExtensionState {
  currentIndex: number;
  items: IListItem[];
}

const CARD_VIEW_REGISTRY_ID: string = 'ListItemsAce_CARD_VIEW';
const MEDIUM_VIEW_REGISTRY_ID: string = 'ListItemsAce_MEDIUM_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'ListItemsAce_QUICK_VIEW';
export const DETAILED_QUICK_VIEW_REGISTRY_ID: string = 'ListItemsAce_DETAILED_QUICK_VIEW';

export default class ListItemsAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IListItemsAceAdaptiveCardExtensionProps,
  IListItemsAceAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: ListItemsAcePropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      currentIndex: 0,
      items: [{title: '', description: ''}]
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.cardNavigator.register(MEDIUM_VIEW_REGISTRY_ID, () => new MediumCardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(DETAILED_QUICK_VIEW_REGISTRY_ID, () => new DetailedQuickView());

    return this._fetchData();
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'ListItemsAce-property-pane'*/
      './ListItemsAcePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.ListItemsAcePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return this.cardSize === 'Medium' ? MEDIUM_VIEW_REGISTRY_ID : CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }

  private _fetchData(): Promise<void> {
    if (this.properties.listId) {
      return this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}` +
        `/_api/web/lists/GetById(id='${this.properties.listId}')/items`,
        SPHttpClient.configurations.v1
      )
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.value.map(
          (item) => { return { title: item.Title, description: item.Description }; })
        )
        .then((items) => this.setState({ items }));
    }

    return Promise.resolve();
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'listId' && newValue !== oldValue) {
      if (newValue) {
        this._fetchData();
      } else {
        this.setState({ items: [] });
      }
    }
  }
}
