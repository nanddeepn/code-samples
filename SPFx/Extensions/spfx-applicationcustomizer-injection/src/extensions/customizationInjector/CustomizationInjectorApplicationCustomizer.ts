import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'CustomizationInjectorApplicationCustomizerStrings';

const LOG_SOURCE: string = 'CustomizationInjectorApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomizationInjectorApplicationCustomizerProperties {
  // This is an example; replace with your own property
  cssurl: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomizationInjectorApplicationCustomizer
  extends BaseApplicationCustomizer<ICustomizationInjectorApplicationCustomizerProperties> {

    @override
    public onInit(): Promise<void> {
      Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
  
      const cssUrl: string = this.properties.cssurl;
      if (cssUrl) {
          // inject the style sheet
          const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
          let customStyle: HTMLLinkElement = document.createElement("link");
          customStyle.href = cssUrl;
          customStyle.rel = "stylesheet";
          customStyle.type = "text/css";
          head.insertAdjacentElement("beforeEnd", customStyle);
      }
  
      return Promise.resolve();
    }
}
