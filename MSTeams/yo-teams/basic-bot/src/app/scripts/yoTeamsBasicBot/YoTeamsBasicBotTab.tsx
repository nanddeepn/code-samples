import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * State for the yoTeamsBasicBotTab React component
 */
export interface IYoTeamsBasicBotTabState extends ITeamsBaseComponentState {

}

/**
 * Properties for the yoTeamsBasicBotTab React component
 */
export interface IYoTeamsBasicBotTabProps {

}

/**
 * Implementation of the yoTeamsBasicBot content page
 */
export class YoTeamsBasicBotTab extends TeamsBaseComponent<IYoTeamsBasicBotTabProps, IYoTeamsBasicBotTabState> {

    public async componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));

        if (await this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.appInitialization.notifySuccess();
        }
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true} column styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Flex.Item>
                        <Header content="Welcome to the YoTeamsBasicBot bot page" />
                    </Flex.Item>
                    <Flex.Item>
                        <div>
                            <Text content="TODO: Add you content here" />
                        </div>
                    </Flex.Item>
                    <Flex.Item styles={{
                        padding: ".8rem 0 .8rem .5rem"
                    }}>
                        <Text size="smaller" content="(C) Copyright Nanddeep Nachan" />
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
