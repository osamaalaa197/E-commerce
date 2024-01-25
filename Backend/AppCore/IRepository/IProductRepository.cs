using AppCore.Consts;
using E_commerce.DTO;
using E_commerce.models;

namespace E_commerce.Repo.Product
{
    public interface IProductRepository
    {
        APIResponse GetAllProduct();
        APIResponse GetById(int id);
        APIResponse DeleteProduct(int id);
        APIResponse UpdateProduct(int id, Products product);
        APIResponse CreateProduct(AddProductDTO addProductDTO);
        APIResponse SearchProduct(string name);

    }
}
