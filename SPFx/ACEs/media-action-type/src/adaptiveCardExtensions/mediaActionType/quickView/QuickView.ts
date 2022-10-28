import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, MediaType } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MediaActionTypeAdaptiveCardExtensionStrings';
import { IMediaActionTypeAdaptiveCardExtensionProps, IMediaActionTypeAdaptiveCardExtensionState } from '../MediaActionTypeAdaptiveCardExtension';
import FileUploadService from '../../../services/FileUploadService';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  filesUploaded: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IMediaActionTypeAdaptiveCardExtensionProps,
  IMediaActionTypeAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      filesUploaded: this.state.filesUploaded
    };
  }

  public get template(): ISPFxAdaptiveCard {
    // return require('./template/QuickViewTemplate.json');
    return {
      body:[
        {
          "type": "TextBlock",
          "weight": "Bolder",
          "text": "${filesUploaded}"
        }
      ],
      actions: [
        {
          id: 'upload image',
          title: 'Upload an image',
          type: 'VivaAction.SelectMedia',
          parameters: {
            mediaType: MediaType.Image,
            allowMultipleCapture: false
          }
        }
      ]
    }
  }

  public onAction(action: IActionArguments): void {
    if (action.type === 'VivaAction.SelectMedia') {
      // media is an array of attachment objects which contain the content and filename
      action.media.map(async attachment => {
        await FileUploadService.UploadFile(attachment.fileName, attachment.content);
      });
      
      this.setState({
        filesUploaded: action.media.map(attachment => attachment.fileName).join(',')
      });
    }
  }
}