using HtmlAgilityPack;
using System;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Backend.DataGW
{
    public class Parser
    {
        private readonly HttpClient _httpClient;
        private readonly string _databaseConnectionString;

        public Parser()
        {
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
            _databaseConnectionString = "Data Source=serwere.database.windows.net; Initial Catalog=ParserowaBaza; User Id=Toor69; Password=RootToToor321";
        }

        public async Task ParseAsync()
        {
            var products = new[]
            {
                new { Name = "Laptopy", Url = "https://www.x-kom.pl/g-2/c/159-laptopy-notebooki-ultrabooki.html" },
                new { Name = "Smartfony", Url = "https://www.x-kom.pl/g-4/c/1590-smartfony-i-telefony.html" },
                new { Name = "Telewizory", Url = "https://www.x-kom.pl/g-8/c/1117-telewizory.html" },
                new { Name = "Tablety", Url = "https://www.x-kom.pl/g-4/c/1663-tablety.html" },
                new { Name = "Monitory", Url = "https://www.x-kom.pl/g-6/c/15-monitory.html" },
                new { Name = "Drukarki", Url = "https://www.x-kom.pl/g-6/c/6-drukarki.html" },
                new { Name = "Komputery stacjonarne", Url = "https://www.x-kom.pl/g-2/c/175-komputery-stacjonarne.html" }
            };

            foreach (var product in products)
            {
                await ParseProductAsync(product.Url, product.Name);
            }
        }

        private async Task ParseProductAsync(string url, string productName)
        {
            for (int i = 1; i <= 1; i++)
            {
                string pageUrl = $"{url}?page={i}";
                var content = await FetchPageContentAsync(pageUrl);
                await ProcessContentAsync(content, productName);
            }
        }

        private async Task<string> FetchPageContentAsync(string url)
        {
            var response = await _httpClient.GetAsync(url);
            return await response.Content.ReadAsStringAsync();
        }

        private async Task ProcessContentAsync(string content, string productName)
        {
            var document = new HtmlDocument();
            document.LoadHtml(content);
            var divSelector = "//div[@class='sc-1s1zksu-0 dzLiED sc-162ysh3-1 irFnoT']";
            var products = document.DocumentNode.SelectNodes(divSelector);

            using (var connection = new SqlConnection(_databaseConnectionString))
            {
                await connection.OpenAsync();
                var command = connection.CreateCommand();

                command.CommandText = $"DELETE FROM {productName}";
                await command.ExecuteNonQueryAsync();
                var id = 1;
                foreach (var productNode in products)
                {
                    var name = productNode.Descendants("h3").FirstOrDefault()?.InnerText.Trim();
                    var link = productNode.Descendants("a").FirstOrDefault()?.Attributes["href"]?.Value;
                    var price = productNode.Descendants("span").FirstOrDefault(n => n.Attributes["data-name"]?.Value == "productPrice")?.InnerText.Trim();
                    var image = productNode.Descendants("img").FirstOrDefault()?.Attributes["src"]?.Value;

                    command.CommandText = $"INSERT INTO {productName} (Id, Name, Link, Price, Image) VALUES (@id, @name, @link, @price, @image)";
                    command.Parameters.AddWithValue("@id", id++);
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@link", link);
                    command.Parameters.AddWithValue("@price", price);
                    command.Parameters.AddWithValue("@image", image);

                    await command.ExecuteNonQueryAsync();
                    command.Parameters.Clear();
                }
            }
        }
    }
}
