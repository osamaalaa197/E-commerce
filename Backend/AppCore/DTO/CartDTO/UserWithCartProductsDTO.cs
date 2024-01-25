using E_commerce.models;

namespace E_commerce.DTO.CartDTO
{
    public class UserWithCartProductsDTO
    {
        public string userid { get; set; }

        public string UserName { get; set; }

        public List<Products> CartProdcts { get; set; }
    }
}
