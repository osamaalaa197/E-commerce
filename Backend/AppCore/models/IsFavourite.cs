using System.ComponentModel.DataAnnotations.Schema;

namespace E_commerce.models
{
    public class IsFavourite
	{
        public int Id { get; set; }
        public Users? Users { get; set; }
        [ForeignKey("UsersId")]
        public string? UsersId { get; set; }
        public Products? Products { get; set; }
		[ForeignKey("ProductsId")]
		public int? ProductsId { get; set; }

	}
}
