import * as React from 'react';
import styles from './CommonCssDemo.module.scss';
import { ICommonCssDemoProps } from './ICommonCssDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CommonCssDemo extends React.Component<ICommonCssDemoProps, {}> {
  public render(): React.ReactElement<ICommonCssDemoProps> {
    return (
      <div className={ styles.shared }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
