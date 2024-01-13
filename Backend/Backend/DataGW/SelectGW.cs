using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Backend.Bean;

namespace Backend.DataGW
{
    public class SelectGW
    {
        public static string databasePath = @"C:\Users\48607\Desktop\Project\Reactivities\API\reactivities.db";

        public static async Task<List<T>> SelectRecords<T>(string tableName)
        {
            List<T> records = new List<T>();

            using (var connection = new SqliteConnection("Data Source=" + databasePath))
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {tableName} where Id <=25";
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
            string id = record.GetString(record.GetOrdinal("Id"));
            string name = record.GetString(record.GetOrdinal("name"));
            string link = record.GetString(record.GetOrdinal("link"));
            string price = record.GetString(record.GetOrdinal("price"));
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
