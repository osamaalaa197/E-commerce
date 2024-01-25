using AppCore;
using AppCore.Consts;
using AppCore.IRepository;
using E_commerce.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEF.Repository
{
    public class IslikeRepository: IIslikeRepository
    {
        private readonly IUnitOfWork _UnitOfWork;

        public IslikeRepository(IUnitOfWork unitOfWork) 
        {
            _UnitOfWork = unitOfWork;
        }

        public APIResponse AddToLikes(string userid, int Productid)
        {
            var response=new APIResponse();
            try 
            {
                var product = _UnitOfWork.Product.GetById(Productid);
                if (product == null) 
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var isfound = _UnitOfWork.IsFavourite.Find(e => e.UsersId == userid);
                if (isfound == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var IsFavourite = new IsFavourite
                {

                    UsersId = userid,
                    ProductsId = Productid,
                };
                _UnitOfWork.IsFavourite.Add(IsFavourite);
                _UnitOfWork.Save();
                response.Data = null;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            catch(Exception ex) 
            {
                response.Data = null;
                response.Success = false;
                response.Message = ex.Message.ToString();
                return response;
            }
        }

        public APIResponse GetAllLikes(string UserId)
        {
            var response=new APIResponse();
            try 
            {
                var res = _UnitOfWork.IsFavourite.FindAllWithInclude(e => e.UsersId == UserId, e => e.Products).ToList().Select(r => new
                {
                    Name = r.Products.Name,
                    Price = r.Products.Price,
                });
                response.Data = res;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Success = false;
                response.Message = ex.Message.ToString();
                return response;
            }

        }
    }
}
