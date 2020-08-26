import * as debug from "debug";
import { PreventIframe } from "express-msteams-host";
import { TurnContext, CardFactory, MessagingExtensionQuery, MessagingExtensionResult, Attachment } from "botbuilder";
import { IMessagingExtensionMiddlewareProcessor } from "botbuilder-teams-messagingextensions";

import { ServiceFactory } from '../services/serviceFactory';
import { CustomerPreviewCard } from '../cards/customerPreviewCard';
import { CustomerResultCard } from '../cards/customerResultCard';

// Initialize debug logging module
const log = debug("msteams");

@PreventIframe("/customerSearchMessageExtension/config.html")
export default class CustomerSearchMessageExtension implements IMessagingExtensionMiddlewareProcessor {

    public async onQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResult> {
        if (query.parameters && query.parameters[0]) {
            const nameQuery = query.parameters[0].name === "initialRun" ? "" : query.parameters[0].value;
            const nwService = ServiceFactory.getNorthwindService();
            const customers = await nwService.getCustomersByName(nameQuery);
            const attachments: Attachment[] = [];

            for (const c of customers) {
                const card = await CustomerResultCard.getCard(c);
                const preview = CustomerPreviewCard.getCard(c);
                const attachment = { ...card, preview };
                attachments.push(attachment);
            }

            var result = {
                type: "result",
                attachmentLayout: "list",
                attachments: attachments
            } as MessagingExtensionResult;

            return Promise.resolve(result);
        } 
        else {
            throw new Error("Invalid query");
        }
    }

    public async onCardButtonClicked(context: TurnContext, value: any): Promise<void> {
        // Handle the Action.Submit action on the adaptive card
        if (value.action === "moreDetails") {
            log(`I got this ${value.id}`);
        }
        return Promise.resolve();
    }

    // this is used when canUpdateConfiguration is set to true
    public async onQuerySettingsUrl(context: TurnContext): Promise<{ title: string, value: string }> {
        return Promise.resolve({
            title: "CustomerSearch Message Extension Configuration",
            value: `https://${process.env.HOSTNAME}/customerSearchMessageExtension/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`
        });
    }

    public async onSettings(context: TurnContext): Promise<void> {
        // take care of the setting returned from the dialog, with the value stored in state
        const setting = context.activity.value.state;
        log(`New setting: ${setting}`);
        return Promise.resolve();
    }

}
