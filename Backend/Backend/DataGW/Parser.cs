using HtmlAgilityPack;
using Microsoft.Data.Sqlite;

namespace Backend.DataGW
{
    public class Parser
    {
        public static async Task ParseAsync()
        {
            string product = "Laptopy";
            int pageCount = 2;
            string urlLaptopy = "https://www.x-kom.pl/g-2/c/159-laptopy-notebooki-ultrabooki.html";
            string urlSmartfony = "https://www.x-kom.pl/g-4/c/1590-smartfony-i-telefony.html";
            string urlTelewizory = "https://www.x-kom.pl/g-8/c/1117-telewizory.html";
            string urlTablety = "https://www.x-kom.pl/g-4/c/1663-tablety.html";
            string urlMonitory = "https://www.x-kom.pl/g-6/c/15-monitory.html";
            string urlDrukarki = "https://www.x-kom.pl/g-6/c/6-drukarki.html";
            string urlKomputery = "https://www.x-kom.pl/g-2/c/175-komputery-stacjonarne.html";
            string databasePath = @"C:\Users\48607\Desktop\Project\Reactivities\API\reactivities.db";
            using (var connection = new SqliteConnection("Data Source=" + databasePath))
            {
                connection.Open();
                using (var command = connection.CreateCommand())

                {
                    await ParserAsync(urlLaptopy, pageCount, product, command);
                    product = "Smartfony";
                    await ParserAsync(urlSmartfony, pageCount, product, command);
                    product = "Telewizory";
                    await ParserAsync(urlTelewizory, pageCount, product, command);
                    product = "Tablety";
                    await ParserAsync(urlTablety, pageCount, product, command);
                    product = "Monitory";
                    await ParserAsync(urlMonitory, pageCount, product, command);
                    product = "Drukarki";
                    await ParserAsync(urlDrukarki, pageCount, product, command);
                    product = "Komputery";
                    await ParserAsync(urlKomputery, pageCount, product, command);
                }
            }
        }

        private static async Task ParserAsync(string urlBase, int pageCount, string productName, SqliteCommand command)
        {
            string div = "//div[@class='sc-1s1zksu-0 dzLiED sc-162ysh3-1 irFnoT']";
            // klient HTTP
            var client = new HttpClient();
            // Obejscie ciastek
            client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

            // Parsowanie zawartości HTML przy użyciu HtmlAgilityPack
            var document = new HtmlDocument();

            for (int i = 1; i <= pageCount; i++)
            {
                // Tworzenie adresu URL dla kolejnej strony
                string url = $"{urlBase}?page={i}";

                // Pobranie zawartości strony
                var response = await client.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                // Parsowanie zawartości HTML przy użyciu HtmlAgilityPack
                document.LoadHtml(content);
                int id = 0;
                // Znalezienie elementów zawierających informacje o produktach
                var _products = document.DocumentNode.SelectNodes(div);
                foreach (var _product in _products)
                {
                    var name = _product.Descendants("h3").First().InnerText.Trim();
                    var link = _product.Descendants("a").First().Attributes["href"].Value;
                    var price = _product.Descendants("span").FirstOrDefault(n => n.Attributes["data-name"]?.Value == "productPrice")?.InnerText.Trim();
                    var image = _product.Descendants("img").First().Attributes["src"].Value;

                    // Aktualizacja rekordu w odpowiedniej tabeli w bazie danych
                    command.CommandText = $"UPDATE {productName} SET name = @name, link = @link, price = @price, image = @image WHERE id= @id";
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@link", link);
                    command.Parameters.AddWithValue("@price", price);
                    command.Parameters.AddWithValue("@image", image);
                    await command.ExecuteNonQueryAsync();
                    command.Parameters.Clear();
                    id++;
                }


                // foreach (var _product in _products)
                // {
                //     var name = _product.Descendants("h3").First().InnerText.Trim();
                //     var link = _product.Descendants("a").First().Attributes["href"].Value;
                //     var price = _product.Descendants("span").FirstOrDefault(n => n.Attributes["data-name"]?.Value == "productPrice")?.InnerText.Trim();
                //     var image = _product.Descendants("img").First().Attributes["src"].Value;

                //     // Dodawanie rekordu do odpowiedniej tabeli w bazie danych
                //     command.CommandText = "INSERT INTO " + productName + " (name, link, price, image) VALUES (@name, @link, @price, @image)";
                //     command.Parameters.AddWithValue("@name", name);
                //     command.Parameters.AddWithValue("@link", link);
                //     command.Parameters.AddWithValue("@price", price);
                //     command.Parameters.AddWithValue("@image", image);
                //     await command.ExecuteNonQueryAsync();
                //     command.Parameters.Clear();
                // }

            }
        }
    }
}
