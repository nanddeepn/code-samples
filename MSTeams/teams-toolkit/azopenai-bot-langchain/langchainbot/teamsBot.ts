import { TeamsActivityHandler } from "botbuilder";
import { ChatOpenAI } from "langchain/chat_models/openai";
import config from "./config";

// Document loader
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

// Text splitter
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";

// Split the Document into chunks for embedding and vector storage.
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 8000,
  chunkOverlap: 0,
});

const loader = new CheerioWebBaseLoader(
  "https://nanddeepnachanblogs.com/about-me/"
);

const model = new ChatOpenAI({
  azureOpenAIApiKey: config.openAIApiKey,
  azureOpenAIApiVersion: config.openAIAPIVersion,
  azureOpenAIApiInstanceName: config.openAIInstanceName,
  azureOpenAIApiDeploymentName: config.openAIChatModel
});

var chain: RetrievalQAChain;

export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.onMembersAdded(async (context, next) => {
      await context.sendActivity("Hello and Welcome to the Teams Bot!");
      await context.sendActivity("Please wait while I load the model and data...");

      // STEP 1: Load the data and split it into chunks for embedding and vector storage.
      const data = await loader.load();
      const splitDocs = await textSplitter.splitDocuments(data);

      // STEP 2: Embed and store the splits in a vector database (unoptimized, in-memory)
      const embeddings = new OpenAIEmbeddings({
        azureOpenAIApiKey: config.openAIApiKey,
        azureOpenAIApiVersion: config.openAIAPIVersion,
        azureOpenAIApiInstanceName: config.openAIInstanceName,
        azureOpenAIApiDeploymentName: config.openAIEmbeddingModel,
        maxConcurrency: 5,
        maxRetries: 10
      });

      // STEP 3: Retrieve splits from storage 
      const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
      chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

      await context.sendActivity("I am ready to chat!");
      await next();
    });

    this.onMessage(async (context, next) => {
      // Get user message
      const { text } = context.activity;

      // Send typing indicator
      await context.sendActivities([{ type: "typing" }]);

      // STEP 4: Distill the retrieved documents into an answer using an LLM (e.g., gpt-3.5-turbo) with RetrievalQA chain.
      const response = await chain.call({
        query: text
      });

      // Send result to user
      await context.sendActivity(response.text);

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}
