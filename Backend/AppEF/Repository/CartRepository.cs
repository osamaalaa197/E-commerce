using AppCore;
using AppCore.Consts;
using AppCore.IRepository;
using AppCore.models;
using E_commerce.Controllers.Cart;
using E_commerce.models;
using E_commerce.Repo.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppEF.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly IUnitOfWork _UnitOfWork;
        private readonly IUserRepository _userRepository;

        public CartRepository(IUnitOfWork unitOfWork,IUserRepository userRepository) 
        {
            _UnitOfWork = unitOfWork;
            _userRepository = userRepository;
        }
        public APIResponse AddProductTOCart(string userId, int productid, int Quantity)
        {
            var response=new APIResponse();
            try 
            {
                var user = _userRepository.GetUserById(userId);
                if (user == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var product = _UnitOfWork.Product.GetById(productid);
                if (product == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                //var isfound = _context.Cartitem.Include(p => p.Product).FirstOrDefault(p => p.UsersId == userid);
                var isfound = _UnitOfWork.Cart.FindWithInclude(e => e.UsersId == userId, e => e.cartitems);
                if (isfound == null)
                {

                    var cart = new Cart
                    {
                        UsersId = userId,
                        //Product = new List<Products> { product }
                    };
                    _UnitOfWork.Cart.Add(cart);
                    _UnitOfWork.Save();
                    var newCartItem = new Cartitem
                    {
                        CartId = cart.Id,
                        ProductsId = productid,
                        Quantity = Quantity

                    };
                    _UnitOfWork.Cartitem.Add(newCartItem);
                    _UnitOfWork.Save();
                    response.Data = null;
                    response.Success = true;
                    response.Message = Message.OperationSuccessful;
                    return response;
                }
                else
                {
                    var newCartItem = new Cartitem
                    {
                        CartId = isfound.Id,
                        ProductsId = productid,
                        Quantity = Quantity
                    };
                    isfound.cartitems.Add(newCartItem);
                    _UnitOfWork.Save();
                    response.Data = null;
                    response.Success = true;
                    response.Message = Message.OperationSuccessful;
                    return response;
                }

            }
            catch(Exception ex) 
            {
                response.Success = false;
                response.Message=Message.OperationFailed;
                return response;
            }
        }

        public APIResponse GetCartForUser(string userId)
        {
            var response = new APIResponse();
            try 
            {
                var userwithCartProduct = _UnitOfWork.Cart.FindWithInclude(e => e.UsersId == userId, e => e.cartitems);
                var res = userwithCartProduct.cartitems.Select(e => new
                {
                    ProductName = _UnitOfWork.Product.GetById(e.ProductsId).Name,
                    ProductPrice = _UnitOfWork.Product.GetById(e.ProductsId).Price
                });
                response.Data = res;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            catch (Exception ex) 
            {
                response.Success = false;
                response.Message = Message.OperationFailed + ex.Message.ToString();
                return response;
            }
        }

        public APIResponse RemoveFromCart(string UserId, int ProductID)
        {
            var response = new APIResponse();
            try {
                if (UserId == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var product = _UnitOfWork.Product.GetById(ProductID);
                if (product == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var CartItem = _UnitOfWork.Cartitem.Find(e => e.Products.Id == ProductID);
                if (CartItem == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                _UnitOfWork.Cartitem.Delete(CartItem.id);
                _UnitOfWork.Save();
                response.Data = null;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            catch(Exception ex) { response.Success = false;response.Message=Message.OperationFailed + ex.Message.ToString(); return response; }  
        }
    }
}
