using AppCore.Consts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.IRepository
{
    public interface ICartRepository
    {
        APIResponse GetCartForUser(string userId);
        APIResponse AddProductTOCart(string userId,int productid, int Quantity);
        APIResponse RemoveFromCart(string UserId, int ProductID);
    }
}
