import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import * as strings from 'HandleNavigationApplicationCustomizerStrings';
import { IHeaderProps, Header } from './components/header';

const LOG_SOURCE: string = 'HandleNavigationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHandleNavigationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HandleNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<IHandleNavigationApplicationCustomizerProperties> {
  private static headerPlaceholder: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.application.navigatedEvent.add(this, () => {
      this.loadReactComponent();
    });

    this.render();

    return Promise.resolve();
  }

  public onDispose() {
    if (HandleNavigationApplicationCustomizer.headerPlaceholder && HandleNavigationApplicationCustomizer.headerPlaceholder.domElement) {
      ReactDom.unmountComponentAtNode(HandleNavigationApplicationCustomizer.headerPlaceholder.domElement);
    }
  }

  private render() {
    if (this.context.placeholderProvider.placeholderNames.indexOf(PlaceholderName.Top) !== -1) {
      if (!HandleNavigationApplicationCustomizer.headerPlaceholder || !HandleNavigationApplicationCustomizer.headerPlaceholder.domElement) {
        HandleNavigationApplicationCustomizer.headerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
          onDispose: this.onDispose
        });
      }

      this.loadReactComponent();
    }
    else {
      console.log(`The following placeholder names are available`, this.context.placeholderProvider.placeholderNames);
    }
  }

  /**
   * Start the React rendering of your components
   */
  private loadReactComponent() {
    if (HandleNavigationApplicationCustomizer.headerPlaceholder && HandleNavigationApplicationCustomizer.headerPlaceholder.domElement) {
      const element: React.ReactElement<IHeaderProps> = React.createElement(Header, {
        context: this.context
      });

      ReactDom.render(element, HandleNavigationApplicationCustomizer.headerPlaceholder.domElement);
    }
    else {
      console.log('DOM element of the header is undefined. Start to re-render.');
      this.render();
    }
  }
}
