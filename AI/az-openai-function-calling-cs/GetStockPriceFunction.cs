using Azure.AI.OpenAI;
using System.Text.Json;

namespace az_openai_function_calling
{
    /// <summary>
    /// Function to get stock price
    /// </summary>
    public class GetStockPriceFunction
    {
        static public string Name = "get_stock_price";

        /// <summary>
        /// Function definition
        /// </summary>
        static public FunctionDefinition GetFunctionDefinition()
        {
            return new FunctionDefinition()
            {
                Name = Name,
                Description = "Get the stock price of company",
                Parameters = BinaryData.FromObjectAsJson(
                new
                {
                    Type = "object",
                    Properties = new
                    {
                        Company = new
                        {
                            Type = "string",
                            Description = "The company, e.g. Contoso",
                        }
                    },
                    Required = new[] { "company" },
                },
                new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }),
            };
        }

        /// <summary>
        /// Function implementation
        /// </summary>
        /// <param name="location"></param>
        /// <param name="unit"></param>
        /// <returns></returns>
        static public StockPrice GetStockPrice(string company)
        {
            Random r = new Random();
            int range = 100;
            double randomStockPrice = r.NextDouble() * range;

            return new StockPrice() { Price = randomStockPrice, Currency = "USD" };
        }
    }

    /// <summary>
    /// Function argument
    /// </summary>
    public class StockPriceInput
    {
        public string Company { get; set; } = string.Empty;
    }

    /// <summary>
    /// Return type
    /// </summary>
    public class StockPrice
    {
        public double Price { get; set; }
        public string Currency { get; set; } = "USD";
    }
}
