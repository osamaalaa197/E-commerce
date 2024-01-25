using Microsoft.AspNetCore.Http;

namespace E_commerce.DTO
{
    public class AddProductDTO
    {
        public string Title { get; set; }
        public string Descirption { get; set; }
        public string Product_Location { get; set; }
        public string Supplier { get; set; }
        public double Price { get; set; }
        public IFormFile ImageUrl { get; set; }
    }
}
