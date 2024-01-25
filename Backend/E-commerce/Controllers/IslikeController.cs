using AppCore;
using AppCore.IRepository;
using E_commerce.Database;
using E_commerce.DTO;
using E_commerce.models;
using E_commerce.Repo.Product;
using E_commerce.Repo.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IslikeController : ControllerBase
    {
        private readonly IIslikeRepository _IIslikeRepository;

        public IslikeController(IIslikeRepository islikeRepository)
        {
            _IIslikeRepository = islikeRepository;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<UserWithLikedProductsDTO> GetAlllike()
        {
            var userId = User.Claims.FirstOrDefault().Value;
            var res= _IIslikeRepository.GetAllLikes(userId);
            return (Ok(res));
        }
        [Authorize]
        [HttpPost]
        public ActionResult AddTOLikes(int Productid)
        {
            var userid = User.Claims.FirstOrDefault().Value;
          var res=  _IIslikeRepository.AddToLikes(userid, Productid);
                return Ok(res);
        }
    }
}
