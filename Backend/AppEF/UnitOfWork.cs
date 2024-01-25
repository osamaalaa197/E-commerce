using AppCore;
using AppCore.IRepository;
using AppCore.models;
using AppEF.Repository;
using E_commerce.Controllers.Cart;
using E_commerce.Database;
using E_commerce.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEF
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly E_commerceDataBase _context;
		public IBaseRepository<Products> Product {  get; set; }
		public IBaseRepository<Cart> Cart { get; set; }
		public IBaseRepository<Cartitem> Cartitem { get; }
		public IBaseRepository<IsFavourite> IsFavourite { get; set; }
		public IBaseRepository<Users> Users { get; }
		public IBaseRepository<Order> Order { get; }
		public IBaseRepository<OrderItem> OrderItem { get; }
		public UnitOfWork(E_commerceDataBase e_CommerceDataBase)
		{
			_context = e_CommerceDataBase;
			Product = new BaseRepository<Products>(e_CommerceDataBase);
			Cart=new BaseRepository<Cart>(e_CommerceDataBase);
			IsFavourite=new BaseRepository<IsFavourite>(e_CommerceDataBase);
			Cartitem=new BaseRepository<Cartitem>(e_CommerceDataBase);
			Users=new BaseRepository<Users>(e_CommerceDataBase);
			Order = new BaseRepository<Order>(e_CommerceDataBase);
			OrderItem=new BaseRepository<OrderItem>(e_CommerceDataBase);
			
		}
		public int Save()
		{
			return _context.SaveChanges();
		}
	}
}
