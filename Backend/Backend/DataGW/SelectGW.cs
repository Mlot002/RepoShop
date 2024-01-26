using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Backend.Bean;

namespace Backend.DataGW
{
    public class SelectGW
    {
        public static string databasePath = "Data Source=serwere.database.windows.net; Initial Catalog=ParserowaBaza; User Id=Toor69; Password=RootToToor321";


        public static async Task<List<T>> SelectRecords<T>(string tableName)
        {
            List<T> records = new List<T>();

            using (var connection = new SqlConnection(databasePath))
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = $"SELECT TOP 25 * FROM {tableName}";
                    var reader = await command.ExecuteReaderAsync();

                    while (reader.Read())
                    {
                        T record = MapToObject<T>(reader);
                        records.Add(record);
                    }

                    reader.Close();
                }
            }

            return records;
        }

        private static T MapToObject<T>(IDataRecord record)
        {
            // Get the values from the reader
            string id = record.GetInt32(record.GetOrdinal("Id")).ToString();
            string name = record.GetString(record.GetOrdinal("name"));
            string link = record.GetString(record.GetOrdinal("link"));
            string price = record.GetString(record.GetOrdinal("price")).ToString();
            string imageUrl = record.GetString(record.GetOrdinal("image"));
            string image = RemoveSuffix(imageUrl, "-mini");

            // Create the product object
            var product = new Product
            {
                Id = id,
                name = name,
                link = link,
                price = price,
                image = image
            };

            return (T)(object)product;
        }
        public static string RemoveSuffix(string input, string suffix)
        {
            int suffixIndex = input.LastIndexOf(suffix);

            if (suffixIndex != -1)
            {
                string modifiedStr = input.Replace(suffix, "");
                return modifiedStr;
            }

            return input;
        }
    }
}
