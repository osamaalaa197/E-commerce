using AppCore.IRepository;
using AppCore.models;
using E_commerce.Controllers.Cart;
using E_commerce.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore
{
	public interface IUnitOfWork
	{
		IBaseRepository<Products> Product {  get; }
		IBaseRepository<IsFavourite> IsFavourite { get; }
		IBaseRepository<Order> Order { get; }
		IBaseRepository<OrderItem> OrderItem { get; }
		IBaseRepository<Cart> Cart { get; }
		IBaseRepository<Cartitem> Cartitem { get; }
		IBaseRepository<Users> Users { get; }	
		int Save();
	}
}
