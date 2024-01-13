using Microsoft.AspNetCore.Mvc;
using Backend.Bean;
using Backend.DataGW;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet("Drukarki")] // api/products/Drukarki
        public async Task<ActionResult<List<Product>>> GetDrukarki()
        {
            List<Product> products = await SelectGW.SelectRecords<Product>("Drukarki");
            return Ok(products);
        }
        [HttpGet("Laptopy")] // api/products/Laptopy
        public async Task<ActionResult<List<Product>>> GetLaptopy()
        {
            List<Product> products = await SelectGW.SelectRecords<Product>("Laptopy");
            return Ok(products);
        }
        [HttpGet("Monitory")] // api/products/Monitory
        public async Task<ActionResult<List<Product>>> GetMonitory()
        {
            List<Product> products = await SelectGW.SelectRecords<Product>("Monitory");
            return Ok(products);
        }
        [HttpGet("Telewizory")] // api/products/Telewizory
        public async Task<ActionResult<List<Product>>> GetTelewizory()
        {
            List<Product> products = await SelectGW.SelectRecords<Product>("Telewizory");
            return Ok(products);
        }
        [HttpGet("Komputery")] // api/products/Komputery
        public async Task<ActionResult<List<Product>>> GetKomputery()
        {
            List<Product> products = await SelectGW.SelectRecords<Product>("Komputery");
            return Ok(products);
        }
        [HttpGet("Tablety")] // api/products/Tablety
        public async Task<ActionResult<List<Product>>> GetTablety()
        {
            List<Product> products = await SelectGW.SelectRecords<Product>("Tablety");
            return Ok(products);
        }
        [HttpGet("Smartfony")] // api/products/Smartfony
        public async Task<ActionResult<List<Product>>> GetSmartfony()
        {
            List<Product> products = await SelectGW.SelectRecords<Product>("Smartfony");
            return Ok(products);
        }


        //[HttpGet("{id}")] // api/products/id
        //public async Task<ActionResult<Product>> GetProduct(Guid id)
        //{
        //    return await _context.Products.FindAsync(id);
        //}
    }
}