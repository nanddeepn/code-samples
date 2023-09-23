import { TeamsActivityHandler } from "botbuilder";
import { ChatOpenAI } from "langchain/chat_models/openai";
import config from "./config";

// Document loader
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

// Text splitter
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from 'langchain/chains';

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
  azureOpenAIApiVersion: "2023-07-01-preview",
  azureOpenAIApiInstanceName: "az-nachan-oai",
  azureOpenAIApiDeploymentName: "gpt-35-turbo"
});

export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      // get user message
      const { text } = context.activity;

      // send typing indicator
      await context.sendActivities([{ type: "typing" }]);

      const data = await loader.load();
      const splitDocs = await textSplitter.splitDocuments(data);

      // Embed and store the splits in a vector database (in-memory)
      const embeddings = new OpenAIEmbeddings({
        azureOpenAIApiKey: config.openAIApiKey,
        azureOpenAIApiVersion: "2023-07-01-preview",
        azureOpenAIApiInstanceName: "az-nachan-oai",
        azureOpenAIApiDeploymentName: "text-embedding-ada-002",
        maxConcurrency: 5,
        maxRetries: 10,
      });

      const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

      const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
      const response = await chain.call({
        query: text
      });

      // send result to user
      await context.sendActivity(response.text);

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}
