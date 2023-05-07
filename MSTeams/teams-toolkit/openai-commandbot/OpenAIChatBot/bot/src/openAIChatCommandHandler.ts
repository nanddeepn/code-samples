import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import helloWorldCard from "./adaptiveCards/helloworldCommand.json";
import { CardData } from "./cardModels";
import config from "./internal/config";
import { Configuration, OpenAIApi } from "openai";

export class OpenAIChatCommandHandler implements TeamsFxBotCommandHandler {
    triggerPatterns: TriggerPatterns = "openAIChat";

    async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {
        console.log(`Bot received message: ${message.text}`);

        const configuration = new Configuration({
            apiKey: config.openAIAPIKey,
        });
        const openai = new OpenAIApi(configuration);

        // Exclude the trigger pattern from the received message
        var messageText = message.text.replace("openAIChat ", "");
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: messageText,
        });

        // Render your adaptive card for reply message
        const cardData: CardData = {
            title: "Hello from OpenAI",
            body: completion.data.choices[0].text,
        };

        const cardJson = AdaptiveCards.declare(helloWorldCard).render(cardData);
        return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
    }
}