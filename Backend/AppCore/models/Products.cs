using AppCore.models;
using E_commerce.Controllers.Cart;

namespace E_commerce.models
{
    public class Products
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Supplier { get; set; }
        public string Descirption { get; set; }
        public string Product_Location { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }


        public ICollection<IsFavourite> IsFavourite { get; set; }
        public ICollection<Cartitem> Cartitem { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }

    }
}
