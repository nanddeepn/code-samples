import * as React from 'react';
import styles from './RichTextControl.module.scss';
import { IRichTextControlProps } from './IRichTextControlProps';
import { IRichTextControlState } from './IRichTextControlState';
import { escape } from '@microsoft/sp-lodash-subset';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { sp } from "@pnp/sp/presets/all";

import { TextField, Label, PrimaryButton } from 'office-ui-fabric-react';

export default class RichTextControl extends React.Component<IRichTextControlProps, IRichTextControlState> {
  public constructor(props) {
    super(props);

    this.state = {
      Title: "",
      editorState: EditorState.createEmpty(),
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  public render(): React.ReactElement<IRichTextControlProps> {
    const { Title, editorState } = this.state;

    return (
      <div className={styles.richTextControl}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <TextField
                label="Title"
                required
                value={Title}
                onChange={this.onTitleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <Label>Description</Label>
              <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <PrimaryButton
                onClick={this.onSave}
                style={{ marginBottom: '15px', marginRight: '8px', float: 'right' }}>
                Save
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onTitleChange = (ev: any, newText: string): void => {
    this.setState({ Title: newText });
  }

  private onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  private async onSave() {
  }
}
