import * as React from 'react';
import styles from './TreeView.module.scss';
import { ITreeItemProps } from './ITreeItemProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class TreeItem extends React.Component<ITreeItemProps, {}> {
  public render(): React.ReactElement<ITreeItemProps> {
    return (
      <div className={styles.treeView}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>I'm Tree Item</p>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
