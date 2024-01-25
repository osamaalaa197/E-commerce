using AppCore;
using AppCore.Consts;
using AppCore.DTO;
using AppCore.IRepository;
using E_commerce.models;

namespace AppEF.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IUnitOfWork _UnitOfWork;

        public OrderRepository(IUnitOfWork unitOfWork) 
        {
            _UnitOfWork = unitOfWork;
        }
        public APIResponse AddOrder(List<OrderDTO> Order, string UserId)
        {
            var response=new APIResponse();
            try 
            {
                foreach (var item in Order)
                {
                    var Product = _UnitOfWork.Product.Find(e => e.Id == item.ProductId);
                    if (Product == null)
                    {
                        response.Data = null;
                        response.Success = false;
                        response.Message = Message.ResourceNotFound;
                        return response;
                    }
                }
                if (UserId == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var isFound = _UnitOfWork.Order.FindWithInclude(e => e.UsersId == UserId, o => o.OrderItem);
                if (isFound == null)
                {
                    var NewOrder = new AppCore.models.Order()
                    {
                        UsersId = UserId
                    };
                    _UnitOfWork.Order.Add(NewOrder);
                    _UnitOfWork.Save();
                    foreach (var item in Order)
                    {
                        var OrderItem = new AppCore.models.OrderItem()
                        {
                            OrderId = NewOrder.Id,
                            ProductsId = item.ProductId,
                            Quantity = item.Quantity
                        };
                        _UnitOfWork.OrderItem.Add(OrderItem);
                        _UnitOfWork.Save();
                    }
                    response.Data = null;
                    response.Success = true;
                    response.Message = Message.OperationSuccessful;
                    return response;
                }
                else
                {
                    foreach (var item in Order)
                    {
                        var OrderItem = new AppCore.models.OrderItem()
                        {
                            OrderId = isFound.Id,
                            ProductsId = item.ProductId,
                            Quantity = item.Quantity
                        };
                        _UnitOfWork.OrderItem.Add(OrderItem);
                        _UnitOfWork.Save();
                    }
                    response.Data = null;
                    response.Success = true;
                    response.Message = Message.OperationSuccessful;
                    return response;
                }
            }
            catch (Exception ex) 
            {
                response.Message=ex.Message.ToString();
                response.Success = false;
                return response;
            }


        }

        public APIResponse GetOrders(string userId)
        {
            var response = new APIResponse();
            try 
            {
                var Order = _UnitOfWork.Order.FindWithInclude(e => e.UsersId == userId, o => o.OrderItem);
                if (Order == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var res = Order.OrderItem.Select(e => new
                {
                    ProductName = _UnitOfWork.Product.Find(r => r.Id == e.ProductsId).Name,
                    Quantity = e.Quantity,
                    TotalPrice = e.Quantity * _UnitOfWork.Product.Find(r => r.Id == e.ProductsId).Price
                });
                var OrderPrice = res.Sum(e => e.TotalPrice);
                response.Data = new
                {
                    Order = res,
                    OrderPrice = OrderPrice,
                };
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            catch (Exception ex) 
            { 
                response.Message=ex.Message.ToString(); 
                response.Success = false;
                return response;
            }

        }

        public APIResponse RemoveOrder(int OrderId)
        {
            var response = new APIResponse();
            try 
            {
                var Order = _UnitOfWork.Order.FindWithInclude(e => e.Id == OrderId, o => o.OrderItem);
                if (Order == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                _UnitOfWork.Order.Delete(OrderId);
                var OrderItem = _UnitOfWork.OrderItem.FindAll(e => e.OrderId == OrderId).ToList();
                foreach (var item in OrderItem)
                {
                    _UnitOfWork.OrderItem.Delete(item.Id);
                }
                _UnitOfWork.Save();
                response.Data = null;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            catch(Exception ex) 
            {
                response.Success=false;
                response.Message=ex.Message.ToString();
                return response;
            }
        }

        public APIResponse RemoveOrderItem(int OrderId, int ProductId)
        {
            var response = new APIResponse();
            try 
            {
                var Order = _UnitOfWork.Order.FindWithInclude(e => e.Id == OrderId, o => o.OrderItem);
                if (Order == null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = Message.ResourceNotFound;
                    return response;
                }
                var OrderItem = _UnitOfWork.OrderItem.Find(e => e.ProductsId == ProductId);
                Order.OrderItem.Remove(OrderItem);
                _UnitOfWork.Save();
                response.Data = null;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            catch(Exception ex) 
            { response.Success=false; response.Message=ex.Message.ToString(); return response; }
        }
    }
}
