using AppCore;
using AppCore.Consts;
using AppCore.models;
using AutoMapper;
using E_commerce.DTO;
using E_commerce.models;
using E_commerce.Repo.Product;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_commerce.Controllers.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

		public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        [HttpGet]
        public ActionResult<APIResponse> GetAllProduct()
        {
            return _productRepository.GetAllProduct();
        }

        [Route("id")]
        [HttpGet]
        public ActionResult<Products> GetById(int id)
        {

            var product = _productRepository.GetById(id);
            //var product=_unitOfWork.Product.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost]
        public ActionResult CreateProduct([FromForm]AddProductDTO AddProductDTO)
        {
			var res = _productRepository.CreateProduct(AddProductDTO);
            return Ok(res);
			//_productRepository.CreateProduct(products);
			//var product= _mapper.Map<Products>(AddProductDTO);
			//var product = new Products
			//{
			//    Name = AddProductDTO.Title,
			//    Supplier = AddProductDTO.Supplier,
			//    Price = AddProductDTO.Price,
			//    Descirption = AddProductDTO.Descirption,
			//    Product_Location = AddProductDTO.Product_Location,
			//    ImageUrl = AddProductDTO.ImageUrl
			//};
			//var res= _unitOfWork.Product.Add(product);
			//_unitOfWork.Save();
			//var RestaurantProduct = new RestaurantProduct()
			//{
			//    ProductsId = product.Id,
			//    RestaurantId = ResturantId,
			//    Availabliity=true
			//};
			//_unitOfWork.RestaurantProduct.Add(RestaurantProduct);
			//_unitOfWork.Save();
		}
        [HttpPut]
        public ActionResult UpdateProduct(int id, [FromBody] Products newProduct)
        {
			var isUpdate = _productRepository.UpdateProduct(id, newProduct);
			//var oldProduct = _productRepository.GetProductByID(id);
			//var oldProduct = _unitOfWork.Product.GetById(id);
			//if (oldProduct == null)
			//{
			//    return NotFound();
			//}
			//oldProduct.Name = newProduct.Name;
			//oldProduct.Supplier=newProduct.Supplier;
			//oldProduct.Price=newProduct.Price;
			//oldProduct.Product_Location=newProduct.Product_Location;
			//oldProduct.ImageUrl=newProduct.ImageUrl;
			//oldProduct.Descirption = newProduct.Descirption;
			//var isUpdate=_productRepository.Update(oldProduct);
			//_unitOfWork.Save();
			//if (isUpdate)
   //         {
   //             return NoContent();
   //         }
   //             return NotFound();
            return Ok(isUpdate);
        }

        [HttpDelete]
        [Route("id")]
        public ActionResult DeleteProduct(int id)
        {
			var res=_productRepository.DeleteProduct(id);
            return Ok(res);
			//_unitOfWork.Save();
			//var isdelete=_productRepository.DeleteProduct(id);
			//if (isdelete)
   //         {
   //             return Ok();

   //         }
   //         else
   //         {
   //             return BadRequest();
   //         }
        }
        [HttpGet]
        [Route("SearchProduct")]
        public ActionResult<APIResponse> SearchProduct(string title)
        {
            //var product= _unitOfWork.Product.FindAll(c => c.Name == title).ToList();

            var product = _productRepository.SearchProduct(title);
            return Ok(product);
        }
    }
}
