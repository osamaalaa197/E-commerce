using E_commerce.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.models
{
	public class OrderItem
	{
		public int Id { get; set; }
		public Order Order { get; set; }
		[ForeignKey("OrderId")]
		public int? OrderId { get; set; }
		public Products Products { get; set; }
		[ForeignKey("ProductsId")]
		public int? ProductsId { get; set; }
		public double Quantity { get; set; }	

	}
}
