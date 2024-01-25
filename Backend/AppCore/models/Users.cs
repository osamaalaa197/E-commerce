using AppCore.models;
using E_commerce.Controllers.Cart;
using Microsoft.AspNetCore.Identity;

namespace E_commerce.models
{
    public class Users :IdentityUser
    {
        public string? Provider {  get; set; }

        public string Location { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<IsFavourite> IsFavourites { get; set;}
        public ICollection<Cart> Carts { get; set; }
    }
}
