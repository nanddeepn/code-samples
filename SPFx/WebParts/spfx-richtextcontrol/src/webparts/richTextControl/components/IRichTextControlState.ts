import { MessageBarType } from 'office-ui-fabric-react';

/**
 * RichTextControl state interface
 */
export interface IRichTextControlState {
    ID?: number;
    Title: string;
    Description?: any;
    editorState?: any;
    MessageText?: string;
    MessageType?: MessageBarType;
}
