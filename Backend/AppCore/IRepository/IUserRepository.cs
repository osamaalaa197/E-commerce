using AppCore.DTO;
using E_commerce.models;

namespace E_commerce.Repo.User
{
    public interface IUserRepository
    {

		Users GetUserById(string id);
    }
}
