import * as debug from "debug";
import { PreventIframe } from "express-msteams-host";
import { TurnContext, CardFactory, MessagingExtensionQuery, MessagingExtensionResult } from "botbuilder";
import { IMessagingExtensionMiddlewareProcessor } from "botbuilder-teams-messagingextensions";
import { TaskModuleRequest, TaskModuleContinueResponse } from "botbuilder";
import { find } from "lodash";
// Initialize debug logging module
const log = debug("msteams");

@PreventIframe("/planetActionMessagingMessageExtension/config.html")
@PreventIframe("/planetActionMessagingMessageExtension/action.html")
export default class PlanetActionMessagingMessageExtension implements IMessagingExtensionMiddlewareProcessor {

    public async onFetchTask(context: TurnContext, value: MessagingExtensionQuery): Promise<MessagingExtensionResult | TaskModuleContinueResponse> {
        return Promise.resolve<TaskModuleContinueResponse>({
            type: "continue",
            value: {
                title: "Input form",
                card: CardFactory.adaptiveCard({
                    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                    type: "AdaptiveCard",
                    version: "1.2",
                    body: [
                        {
                            type: "TextBlock",
                            text: "Please enter planet name to insert into the message:"
                        },
                        {
                            type: "Input.Text",
                            id: "planetName",
                            placeholder: "Enter planet name (e.g. Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune)"
                        },
                    ],
                    actions: [
                        {
                            type: "Action.Submit",
                            title: "OK",
                            data: { id: "unique-id" }
                        }
                    ]
                })
            }
        });
    }

    // handle action response in here
    // See documentation for `MessagingExtensionResult` for details
    public async onSubmitAction(context: TurnContext, value: TaskModuleRequest): Promise<MessagingExtensionResult> {
        // load planets & sort them by their order from the sun
        const planets: any = require("../planets.json");

        // get the selected planet
        const selectedPlanet: any = planets.filter((planet) => planet.name === value.data.planetName)[0];

        // load display card
        const adaptiveCardSource: any = require("../planetDisplayCard.json");

        // update planet fields in display card
        adaptiveCardSource.actions[0].url = selectedPlanet.wikiLink;
        find(adaptiveCardSource.body, { "id": "cardHeader" }).items[0].text = selectedPlanet.name;
        const cardBody: any = find(adaptiveCardSource.body, { "id": "cardBody" });
        find(cardBody.items, { "id": "planetSummary" }).text = selectedPlanet.summary;
        find(cardBody.items, { "id": "imageAttribution" }).text = "*Image attribution: " + selectedPlanet.imageAlt + "*";
        const cardDetails: any = find(cardBody.items, { "id": "planetDetails" });
        cardDetails.columns[0].items[0].url = selectedPlanet.imageLink;
        find(cardDetails.columns[1].items[0].facts, { "id": "orderFromSun" }).value = selectedPlanet.id;
        find(cardDetails.columns[1].items[0].facts, { "id": "planetNumSatellites" }).value = selectedPlanet.numSatellites;
        find(cardDetails.columns[1].items[0].facts, { "id": "solarOrbitYears" }).value = selectedPlanet.solarOrbitYears;
        find(cardDetails.columns[1].items[0].facts, { "id": "solarOrbitAvgDistanceKm" }).value = Number(selectedPlanet.solarOrbitAvgDistanceKm).toLocaleString();

        // return the adaptive card
        const card = CardFactory.adaptiveCard(adaptiveCardSource);

        return Promise.resolve({
            type: "result",
            attachmentLayout: "list",
            attachments: [card]
        } as MessagingExtensionResult);
    }

    // this is used when canUpdateConfiguration is set to true
    public async onQuerySettingsUrl(context: TurnContext): Promise<{ title: string, value: string }> {
        return Promise.resolve({
            title: "Planet Action Messaging Configuration",
            value: `https://${process.env.HOSTNAME}/planetActionMessagingMessageExtension/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`
        });
    }

    public async onSettings(context: TurnContext): Promise<void> {
        // take care of the setting returned from the dialog, with the value stored in state
        const setting = context.activity.value.state;
        log(`New setting: ${setting}`);
        return Promise.resolve();
    }
}
