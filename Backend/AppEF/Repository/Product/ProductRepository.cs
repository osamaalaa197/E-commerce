using AppCore;
using AppCore.Consts;
using AppCore.DTO;
using AppEF;
using Azure;
using E_commerce.Database;
using E_commerce.DTO;
using E_commerce.models;
using Microsoft.AspNetCore.Http;

namespace E_commerce.Repo.Product
{
    public class ProductRepository:IProductRepository
    {
		private readonly IUnitOfWork _unitOfWork;

		public ProductRepository(IUnitOfWork unitOfWork)
        {
			_unitOfWork = unitOfWork;
        }
        public APIResponse CreateProduct(AddProductDTO AddProductDTO)
        {
			var response=new APIResponse();
			var product = new Products
			{
				Name = AddProductDTO.Title,
				Supplier = AddProductDTO.Supplier,
				Price = AddProductDTO.Price,
				Descirption = AddProductDTO.Descirption,
				Product_Location = AddProductDTO.Product_Location,
				ImageUrl = UploadPhoto( AddProductDTO.ImageUrl,"Images",string.Empty,Guid.NewGuid())
			};
			var res = _unitOfWork.Product.Add(product);
			_unitOfWork.Save();
			if (res) 
			{
                response.Data = product;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
			else
			{
                response.Data = null;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
		}
        public APIResponse DeleteProduct(int id)
        {
			var response=new APIResponse();
			try 
			{
				var product= _unitOfWork.Product.GetById(id);
				if (product != null) 
				{
                    var isdelete = _unitOfWork.Product.Delete(id);
                    _unitOfWork.Save();
                    if (isdelete)
                    {
                        response.Data = null;
                        response.Success = true;
                        response.Message = Message.OperationSuccessful;
                        return response;
                    }
                }
                response.Data = null;
                response.Success = false;
                response.Message = Message.ResourceNotFound;
                return response;
            } 
			catch (Exception ex) 
			{
                response.Data = null;
                response.Success = false;
                response.Message = Message.OperationFailed + ex.Message.ToString();
                return response;
            }
		}
        public APIResponse GetAllProduct()
        {
			var response=new APIResponse();
			response.Success= true;
			response.Message= Message.OperationSuccessful;
			response.Data = _unitOfWork.Product.GetAll().ToList().Select(e=>new ReadProductDTO 
			{
				Title=e.Name,
				Descirption=e.Descirption,
				Price=e.Price,
				ImagUrl=e.ImageUrl,
				Product_Location=e.Product_Location,
				Supplier=e.Supplier,
			});
			return response;
		}
		public APIResponse GetById(int id)
        {
			var response = new APIResponse();
            var producct = _unitOfWork.Product.GetById(id);
			if(producct==null) 
			{
                response.Data = null;
                response.Success = false;
                response.Message = Message.ResourceNotFound;
                return response;
            }
            response.Data = new ReadProductDTO
            {
                Title = producct.Name,
                Descirption = producct.Descirption,
                Price = producct.Price,
                ImagUrl = producct.ImageUrl,
                Product_Location = producct.Product_Location,
                Supplier = producct.Supplier,
            };
            response.Success = true;
            response.Message = Message.OperationSuccessful;
            return response;
        }
        public APIResponse UpdateProduct(int id, Products newProduct)
        {
			var response = new APIResponse();
			var oldProduct = _unitOfWork.Product.GetById(id);
			if (oldProduct == null)
			{
                response.Data = null;
                response.Success = false;
                response.Message = Message.ResourceNotFound;
                return response;
            }
			oldProduct.Name = newProduct.Name;
			oldProduct.Supplier = newProduct.Supplier;
			oldProduct.Price = newProduct.Price;
			oldProduct.Product_Location = newProduct.Product_Location;
			oldProduct.ImageUrl = newProduct.ImageUrl;
			oldProduct.Descirption = newProduct.Descirption;
			var res= _unitOfWork.Product.Update(oldProduct);
			_unitOfWork.Save();
			if (res) 
			{
                response.Data = oldProduct;
                response.Success = true;
                response.Message = Message.OperationSuccessful;
                return response;
            }
            response.Data = null;
            response.Success = false;
            response.Message = Message.OperationFailed;
            return response;

        }

        public APIResponse SearchProduct(string name)
        {
			var response = new APIResponse();
			var product = _unitOfWork.Product.FindAll(c => c.Name == name).ToList().Select(e=> new ReadProductDTO
            {
                Title = e.Name,
                Descirption = e.Descirption,
                Price = e.Price,
                ImagUrl = e.ImageUrl,
                Product_Location = e.Product_Location,
                Supplier = e.Supplier,
            });
			response.Data = product;
			response.Success = true;
			response.Message= Message.OperationSuccessful;
			return response;
        }

		private string UploadPhoto(IFormFile file,string folder,string name,Guid id)
		{
			string dpPath = "";
			try { 
				if(file.Length > 0) 
				{
					string folderName = Path.Combine("wwwroot", folder);
					string PathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
					if(!Directory.Exists(PathToSave))
						Directory.CreateDirectory(PathToSave);
					string fileName = name.Trim() + id + ".jbg";
					string FullPath=Path.Combine(PathToSave, fileName);
					dpPath=Path.Combine(folderName, fileName);
					using(var stream=new FileStream(FullPath,FileMode.Create)) 
					{

						file.CopyTo(stream);
					}
				}

			}catch(Exception e) 
			{
				e.Message.ToString();
			}
			return dpPath.Replace($"wwwroot\\{folder}\\","");
		}
    }
}
