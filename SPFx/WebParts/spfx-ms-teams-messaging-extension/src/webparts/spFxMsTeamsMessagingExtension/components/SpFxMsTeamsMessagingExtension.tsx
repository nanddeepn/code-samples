import * as React from 'react';
import styles from './SpFxMsTeamsMessagingExtension.module.scss';
import { ISpFxMsTeamsMessagingExtensionProps } from './ISpFxMsTeamsMessagingExtensionProps';
import {ISpFxMsTeamsMessagingExtensionState} from './ISpFxMsTeamsMessagingExtensionState';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
import { DocumentCard, DocumentCardTitle, DocumentCardImage, IDocumentCardStyles } from 'office-ui-fabric-react/lib/DocumentCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

const cardStyles: IDocumentCardStyles = {
  root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
};

const conversationTileClass = mergeStyles({ height: 182 });

export default class SpFxMsTeamsMessagingExtension extends React.Component<ISpFxMsTeamsMessagingExtensionProps, ISpFxMsTeamsMessagingExtensionState> {
  
  constructor(props: ISpFxMsTeamsMessagingExtensionProps) {
    super(props);

    this.state = {      
      submitCardDialogVisible: false
    };
  }

  public render(): React.ReactElement<ISpFxMsTeamsMessagingExtensionProps> {

    // load planets
    const planets: any[] = require("./planets.json");

    return (
      <div>
        <Dialog
          hidden={!this.state.submitCardDialogVisible}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Loading data'
          }}
          styles={{
            main: [{
              selectors: {
                ['@media (min-width: 480px)']: {
                  minWidth: '500px',
                  minHeight: '200px'
                }
              }
            }]
          }}
          modalProps={{
            isBlocking: true,
            dragOptions: undefined,
          }}>
          <Spinner label='Loading data from the Planet System...' labelPosition='right' size={SpinnerSize.large} style={{ margin: '2em auto' }} />
        </Dialog>
        {planets.map((planet, i) =>
          <DocumentCard
            styles={cardStyles}
            onClick={() => this._planetClicked(planet.name)}
          >
            <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={planet.imageLink} />
            <div className={conversationTileClass}>
              <DocumentCardTitle
                title={planet.name}
                shouldTruncate
              />
              <DocumentCardTitle
                title={planet.summary}
                shouldTruncate
                showAsSecondaryTitle
              />
            </div>
          </DocumentCard>
        )}
      </div>
    );
  }

  @autobind
  private _planetClicked(planet: string): void {
    const host: string = this.props.host._teamsManager._appContext.applicationName;
    if (host !== 'TeamsTaskModuleApplication') {
      return;
    }

    this.setState({ submitCardDialogVisible: true });
    this.props.teamsContext.tasks.submitTask(planet);
  }
}
