using E_commerce.Controllers.Cart;
using E_commerce.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.models
{
	public class Cartitem
	{
		public int id { get; set; }
		public double Quantity { get; set; }
		public Cart Cart { get; set; }
		[ForeignKey("Cart")]
		public int CartId { get; set; }
		public Products Products { get; set; }
		[ForeignKey("ProductsId")]
		public int ProductsId { get; set; }
	}
}
