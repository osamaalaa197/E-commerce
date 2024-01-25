using AppCore.models;
using E_commerce.models;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commerce.Controllers.Cart
{
    public class Cart
    {
        public int Id { get; set; }
        public Users? Users { get; set; }
        [ForeignKey("UsersId")]
        public string? UsersId { get; set; }
        public ICollection<Cartitem> cartitems { get; set; }
    }
}
