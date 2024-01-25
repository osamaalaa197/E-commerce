using E_commerce.models;

namespace E_commerce.DTO
{
    public class UserWithLikedProductsDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public List<string> LikedProducts { get; set; }
    }
}
