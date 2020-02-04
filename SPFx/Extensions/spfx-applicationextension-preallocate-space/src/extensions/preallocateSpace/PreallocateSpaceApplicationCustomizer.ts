import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'PreallocateSpaceApplicationCustomizerStrings';

const LOG_SOURCE: string = 'PreallocateSpaceApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPreallocateSpaceApplicationCustomizerProperties {
  Top: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PreallocateSpaceApplicationCustomizer
  extends BaseApplicationCustomizer<IPreallocateSpaceApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Added to handle possible changes on the existence of placeholders.  
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    // Call render method for generating the HTML elements.  
    this._renderPlaceHolders();

    return Promise.resolve();
  }

  public getTopMessage(): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
      setTimeout(() => resolve(this.properties.Top), 2000);
    });
  }

  private _renderPlaceHolders(): void {
    // Handling the top placeholder  
    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose }
        );

      // The extension should not assume that the expected placeholder is available.  
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = '(Top property was not defined.)';
        }

        if (this._topPlaceholder.domElement) {
          this.getTopMessage().then((topMessage: string) => {
            this._topPlaceholder.domElement.innerHTML = `  
            <div>  
              <div class="ms-bgColor-themeDark ms-fontColor-white">  
                <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${topMessage}  
              </div>  
            </div>`;
          });
        }
      }
    }
  }

  private _onDispose(): void {
    console.log('[PreallocateSpaceApplicationCustomizer._onDispose] Disposed custom top placeholder.');
  }
}
