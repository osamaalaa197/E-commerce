using AppCore.Consts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.IRepository
{
    public interface IIslikeRepository
    {
        APIResponse GetAllLikes(string UserId);
        APIResponse AddToLikes(string userid, int Productid);
    }
}
