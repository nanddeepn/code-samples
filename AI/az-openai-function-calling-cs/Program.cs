using Azure;
using Azure.AI.OpenAI;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace az_openai_function_calling
{
    internal class Program
    {
        private static async Task Main(string[] args)
        {
            Uri openAIUri = new("https://contoso.openai.azure.com/");
            string openAIApiKey = "";   // Add your Azure OpenAI API key
            string model = "gpt-35-turbo-16k";

            // Create Azure OpenAI client
            OpenAIClient client = new(openAIUri, new AzureKeyCredential(openAIApiKey));
            ChatCompletionsOptions chatCompletionsOptions = new ChatCompletionsOptions();

            // Read user input
            Console.WriteLine("System >  I can help you find stock price of a given company");
            Console.Write("User > ");
            string question = Console.ReadLine()?.Trim();
            chatCompletionsOptions.Messages.Add(new(ChatRole.User, question));

            // Make LLM function aware
            FunctionDefinition getStockPriceFunctionDefinition = GetStockPriceFunction.GetFunctionDefinition();
            chatCompletionsOptions.Functions.Add(getStockPriceFunctionDefinition);

            // Call the Completion in a loop to determine if the finish reason is "function" or "stop."
            ChatCompletions response = await client.GetChatCompletionsAsync(model, chatCompletionsOptions);
            ChatChoice responseChoice = response.Choices[0];

            // Loop until the finish reason is not "function."
            while (responseChoice.FinishReason == CompletionsFinishReason.FunctionCall)
            {
                // Add message to history.
                chatCompletionsOptions.Messages.Add(responseChoice.Message);

                if (responseChoice.Message.FunctionCall.Name == GetStockPriceFunction.Name)
                {
                    string unvalidatedArguments = responseChoice.Message.FunctionCall.Arguments;
                    StockPriceInput input = JsonSerializer.Deserialize<StockPriceInput>(unvalidatedArguments, new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })!;

                    var functionResultData = GetStockPriceFunction.GetStockPrice(input.Company);
                    var functionResponseMessage = new ChatMessage(
                        ChatRole.Function,
                        JsonSerializer.Serialize(
                            functionResultData,
                            new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }
                    ));

                    functionResponseMessage.Name = GetStockPriceFunction.Name;
                    chatCompletionsOptions.Messages.Add(functionResponseMessage);
                }

                // Call LLM again to generate the response.
                response = await client.GetChatCompletionsAsync(model, chatCompletionsOptions);
                responseChoice = response.Choices[0];
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(responseChoice.Message.Content);

            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Finished");
        }
    }
}
