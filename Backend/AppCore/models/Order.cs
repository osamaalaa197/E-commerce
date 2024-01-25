using E_commerce.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.models
{
	public class Order
	{
		public int Id { get; set; }
		public Users? Users { get; set; }
		[ForeignKey("UsersId")]
		public string? UsersId { get; set; }
		public ICollection<OrderItem> OrderItem { get; set; }

	}
}
