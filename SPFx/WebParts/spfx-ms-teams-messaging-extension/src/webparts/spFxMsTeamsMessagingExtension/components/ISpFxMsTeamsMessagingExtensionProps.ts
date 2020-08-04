import * as microsoftTeams from '@microsoft/teams-js';

export interface ISpFxMsTeamsMessagingExtensionProps {
  description: string;
  host?: any;
  teamsContext?: typeof microsoftTeams;
}
