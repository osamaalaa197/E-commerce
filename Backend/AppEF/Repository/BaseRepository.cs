using AppCore.IRepository;
using E_commerce.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AppEF.Repository
{
	public class BaseRepository <T>: IBaseRepository <T> where T :class 	{
		private readonly E_commerceDataBase _context;

		public BaseRepository(E_commerceDataBase e_CommerceDataBase) { _context = e_CommerceDataBase; }
		public bool Add(T entity)
		{
			_context.Add(entity);
			return true;
		}
		public IQueryable<T> FindAllWithInclude(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes)
		{
			IQueryable<T> query = _context.Set<T>();
			foreach (var include in includes) {
				query= query.Include(include);
			}
			return query.Where(criteria);
		}
		public T FindWithInclude(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes)
		{
			IQueryable<T> query = _context.Set<T>();
			foreach (var include in includes)
			{
				query = query.Include(include);
			}
			return query.Where(criteria).FirstOrDefault();
		}
		public bool Delete(int id)
		{
			var entity = GetById(id);
			_context.Remove(entity);
			return true;
		}
		public IQueryable<T> GetAll()
		{
			return _context.Set<T>();
		}
		public T Find(Expression<Func<T, bool>> criteria)
		{
			IQueryable<T> query = _context.Set<T>();
			return query.FirstOrDefault(criteria);
		}
		public T GetById(int id)
		{
			var entity= _context.Set<T>().Find(id);
			return entity;

		}
		public bool Update(T entity)
		{
			_context.Update(entity);
			return true;
		}
		public IEnumerable<T> FindAll(Expression<Func<T, bool>> criteria)
		{
			IQueryable<T> query = _context.Set<T>().Where(criteria);
			return query.ToList();
		}
	}
}
