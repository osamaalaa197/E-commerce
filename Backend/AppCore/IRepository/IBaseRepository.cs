using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.IRepository
{
	public interface IBaseRepository <T> where T : class
	{
		bool Add(T entity);
		T GetById(int id);
		IQueryable<T> GetAll();
		bool Update(T entity);
		bool Delete(int id);
		//IEnumerable<T> GetAll(Expression<Func<T,bool>> criteria);
		T Find(Expression<Func<T, bool>> criteria);
		IEnumerable<T> FindAll(Expression<Func<T, bool>> criteria);
		 IQueryable<T> FindAllWithInclude(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes);
		T FindWithInclude(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes);
	}
}
