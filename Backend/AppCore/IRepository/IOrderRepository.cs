using AppCore.Consts;
using AppCore.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.IRepository
{
    public interface IOrderRepository
    {
        APIResponse AddOrder(List<OrderDTO> Order,string UserId);
        APIResponse RemoveOrder(int OrderId);
        APIResponse RemoveOrderItem(int OrderId, int ProductId);
        APIResponse GetOrders(string userId);
    }
}
