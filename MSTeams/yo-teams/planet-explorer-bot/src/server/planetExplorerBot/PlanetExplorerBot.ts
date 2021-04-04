import { BotDeclaration } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes, TeamsActivityHandler, MessagingExtensionAction, MessagingExtensionActionResponse, MessagingExtensionAttachment } from "botbuilder";
import HelpDialog from "./dialogs/HelpDialog";
import WelcomeCard from "./dialogs/WelcomeDialog";
import { find } from "lodash";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for Planet Explorer Bot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    // eslint-disable-next-line no-undef
    process.env.MICROSOFT_APP_ID,
    // eslint-disable-next-line no-undef
    process.env.MICROSOFT_APP_PASSWORD)

export class PlanetExplorerBot extends TeamsActivityHandler {
    private readonly conversationState: ConversationState;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        super();

        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);
        this.dialogs.add(new HelpDialog("help"));
        // Set up the Activity processing
        this.onMessage(async (context: TurnContext): Promise<void> => {
            // TODO: add your own bot logic in here
            switch (context.activity.type) {
                case ActivityTypes.Message:
                    {
                        let text = TurnContext.removeRecipientMention(context.activity);
                        text = text.toLowerCase();
                        if (text.startsWith("hello")) {
                            await context.sendActivity("Oh, hello to you as well!");
                            return;
                        } else if (text.startsWith("help")) {
                            const dc = await this.dialogs.createContext(context);
                            await dc.beginDialog("help");
                        } else {
                            await context.sendActivity("I'm terribly sorry, but my developer hasn't trained me to do anything yet...");
                        }
                    }
                    break;
                default:
                    break;
            }
            // Save state changes
            return this.conversationState.saveChanges(context);
        });

        this.onConversationUpdate(async (context: TurnContext): Promise<void> => {
            if (context.activity.membersAdded && context.activity.membersAdded.length !== 0) {
                for (const idx in context.activity.membersAdded) {
                    if (context.activity.membersAdded[idx].id === context.activity.recipient.id) {
                        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                        await context.sendActivity({ attachments: [welcomeCard] });
                    }
                }
            }
        });

        this.onMessageReaction(async (context: TurnContext): Promise<void> => {
            const added = context.activity.reactionsAdded;
            if (added && added[0]) {
                await context.sendActivity({
                    textFormat: "xml",
                    text: `That was an interesting reaction (<b>${added[0].type}</b>)`
                });
            }
        });
    }

    protected async handleTeamsMessagingExtensionSubmitAction(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
        const userData: string = action.data;

        // load planets
        const planets: any = require("./planets.json");

        // get the selected planet
        const selectedPlanet: any = planets.filter((planet) => planet.name === userData)[0];
        const adaptiveCard = this.getPlanetDetailCard(selectedPlanet);

        await context.sendActivity({ attachments: [adaptiveCard] });
        return Promise.resolve({});
    }

    private getPlanetDetailCard(selectedPlanet: any): MessagingExtensionAttachment {
        // load display card
        const adaptiveCardSource: any = require("./planetDisplayCard.json");

        // update planet fields in display card
        adaptiveCardSource.actions[0].url = selectedPlanet.wikiLink;
        find(adaptiveCardSource.body, { id: "cardHeader" }).items[0].text = selectedPlanet.name;
        const cardBody: any = find(adaptiveCardSource.body, { id: "cardBody" });
        find(cardBody.items, { id: "planetSummary" }).text = selectedPlanet.summary;
        find(cardBody.items, { id: "imageAttribution" }).text = "*Image attribution: " + selectedPlanet.imageAlt + "*";
        const cardDetails: any = find(cardBody.items, { id: "planetDetails" });
        cardDetails.columns[0].items[0].url = selectedPlanet.imageLink;
        find(cardDetails.columns[1].items[0].facts, { id: "orderFromSun" }).value = selectedPlanet.id;
        find(cardDetails.columns[1].items[0].facts, { id: "planetNumSatellites" }).value = selectedPlanet.numSatellites;
        find(cardDetails.columns[1].items[0].facts, { id: "solarOrbitYears" }).value = selectedPlanet.solarOrbitYears;
        find(cardDetails.columns[1].items[0].facts, { id: "solarOrbitAvgDistanceKm" }).value = Number(selectedPlanet.solarOrbitAvgDistanceKm).toLocaleString();

        // return the adaptive card
        return CardFactory.adaptiveCard(adaptiveCardSource);
    }
}
