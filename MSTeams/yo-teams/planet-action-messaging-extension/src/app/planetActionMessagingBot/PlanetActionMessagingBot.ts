import { BotDeclaration, MessageExtensionDeclaration, PreventIframe } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import PlanetActionMessagingMessageExtension from "../planetActionMessagingMessageExtension/PlanetActionMessagingMessageExtension";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes, TeamsActivityHandler } from "botbuilder";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for Planet Action Messaging Bot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)

export class PlanetActionMessagingBot extends TeamsActivityHandler {
    private readonly conversationState: ConversationState;
    /** Local property for PlanetActionMessagingMessageExtension */
    @MessageExtensionDeclaration("planetActionMessagingMessageExtension")
    private _planetActionMessagingMessageExtension: PlanetActionMessagingMessageExtension;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        super();

        // Message extension PlanetActionMessagingMessageExtension
        this._planetActionMessagingMessageExtension = new PlanetActionMessagingMessageExtension();

        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);
    }
}
