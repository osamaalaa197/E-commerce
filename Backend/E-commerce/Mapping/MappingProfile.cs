using AutoMapper;
using E_commerce.DTO;
using E_commerce.models;

namespace E_commerce.Mapping
{
	public class MappingProfile:Profile
	{
		public MappingProfile() {

			#region Product
			CreateMap<Products, AddProductDTO>();
			#endregion

		}
	}
}
