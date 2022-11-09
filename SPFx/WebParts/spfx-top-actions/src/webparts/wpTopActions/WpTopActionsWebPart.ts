import { Version } from '@microsoft/sp-core-library';
import { ITopActions } from '@microsoft/sp-top-actions';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneFieldType, PropertyPaneChoiceGroup } from '@microsoft/sp-property-pane';

import styles from './WpTopActionsWebPart.module.scss';

export interface IWpTopActionsWebPartProps {
}

export default class WpTopActionsWebPart extends BaseClientSideWebPart<IWpTopActionsWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `<div class="${ styles.wpTopActions }"></div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  public getTopActionsConfiguration(): ITopActions {
    return {
      topActions: [
        {
          type: PropertyPaneFieldType.Button,
          targetProperty: 'sayHello',
          properties: {
            text: 'Say Hello!',
            icon: 'GreetingCard'
          }
        },
        {
          ...PropertyPaneChoiceGroup('selectColor', {
            label: 'Select color',
            options: [
              {
                key: 'red',
                text: 'Red'
              },
              {
                key: 'yellow',
                text: 'Yellow'
              },
              {
                key: 'green',
                text: 'Green'
              }
            ]
          }),
          title: 'My Top Bar'
        }
      ],
      onExecute(actionName, newValue) {
        switch(actionName) {
          case 'sayHello':
            alert('Hello');
            break;
          case 'selectColor':
            alert(`Selected color: ${newValue}`);
            break;
        }
      },
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
