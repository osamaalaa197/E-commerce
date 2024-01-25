using AppCore;
using AppCore.IRepository;
using AppCore.models;
using E_commerce.Database;
using E_commerce.DTO.CartDTO;
using E_commerce.models;
using E_commerce.Repo.Product;
using E_commerce.Repo.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Controllers.Cart
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly ICartRepository _ICartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _ICartRepository=cartRepository;
        }
        [Authorize]
        [HttpGet]
        public ActionResult GetCartForUser()
        {

            var user = User.Claims.FirstOrDefault().Value;
           var res= _ICartRepository.GetCartForUser(user);
			return Ok(res);

        }   
        [Authorize]
        [HttpPost]
        public ActionResult AddProductTOCart(int productid, int Quantity)
        {
            var userid = User.Claims.FirstOrDefault().Value;
            var res= _ICartRepository.AddProductTOCart(userid,productid,Quantity);
            return Ok(res);
        }
        [Authorize]
        [HttpDelete]
        public ActionResult RemoveFromCart( int ProductID)
        {
            var UserId = User.Claims.FirstOrDefault().Value;
            var res= _ICartRepository.RemoveFromCart(UserId,ProductID);
          
            return Ok(res);
        }

    }
}
