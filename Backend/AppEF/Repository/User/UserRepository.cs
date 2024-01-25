using AppCore.Consts;
using AppCore.DTO;
using E_commerce.Database;
using E_commerce.DTO;
using E_commerce.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text;

namespace E_commerce.Repo.User
{
    public class UserRepository : IUserRepository
    {
        private readonly E_commerceDataBase _context;
		private readonly UserManager<Users> _userManager;
		private readonly IConfiguration _configuration;
		private readonly IHttpClientFactory _httpClientFactory;

		public UserRepository(E_commerceDataBase e_CommerceData,UserManager<Users> userManager, IConfiguration configuration,IHttpClientFactory httpClientFactory)
        {
            _context = e_CommerceData;
			_userManager = userManager;
			_configuration = configuration;
			_httpClientFactory=httpClientFactory;
		}

        public Users GetUserById(string id)
        {
            var user = _context.Users.FirstOrDefault(p => p.Id == id);
            return user;
        }

		public async Task<object> SocialMediaLogIn(SocialLoginRequest request) 
		{
			var tokenValidationResult = await ValidateSocialToken(request);
			if (!tokenValidationResult) 
			{ 
				return new { message= "token not Valid" };
			}
			var user=await _userManager.FindByEmailAsync(request.Email);
			if (user == null) 
			{
				var ResgisterResult=SocialMediaResgister(request);
				if (ResgisterResult == null) 
				{
					return "Resgister not Valid";
				}
				user = (Users?)ResgisterResult.Result;
				
			}
			if (user.Provider != request.Provider)
			{
				return ($"User was registered via {user.Provider} and cannot be logged via {request.Provider}.");
			}
			var claimList = await _userManager.GetClaimsAsync(user);

			string keyString = _configuration.GetValue<string>("secretkey");
			var keyBytes = Encoding.ASCII.GetBytes(keyString);
			var key = new SymmetricSecurityKey(keyBytes);
			var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

			var expire = DateTime.Now.AddMinutes(60);
			var jwt = new JwtSecurityToken(
				claims: claimList,
				signingCredentials: signingCredentials,
				expires: expire
			);

			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenString = tokenHandler.WriteToken(jwt);
			return new TokenData
			{
				Token = tokenString,
				Expire = expire,
				userId = user.Id
			};

		}
		private async Task<object> SocialMediaResgister(SocialLoginRequest request)
		{
			var user = new Users
			{
				Email = request.Email,
				UserName = request.Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				Provider = request.Provider,
			};
			var result = await _userManager.CreateAsync(user, $"Pass!1{Guid.NewGuid().ToString()}");
			if (!result.Succeeded)
			{
				return (new {message=$"Unable to register user {request.Email}, errors: {result.Errors}" });
			}
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id),
				new Claim(ClaimTypes.Role, "User")
			};
			await _userManager.AddClaimsAsync(user, claims);

			return (new {User=user});
		}
		private async Task<bool> ValidateSocialToken(SocialLoginRequest request)
		{
			return request.Provider switch
			{
				Consts.LoginProviders.Facebook => await ValidateFacebookToken(request),
				Consts.LoginProviders.Google => await ValidateGoogleToken(request),
				_ => false
			};
			
		}
		private async Task<bool> ValidateFacebookToken(SocialLoginRequest request)
		{
			var httpClient=_httpClientFactory.CreateClient();
			var appAccessTokenResponse = await httpClient.GetFromJsonAsync<FacebookAppAccessTokenResponse>($"https://graph.facebook.com/oauth/access_token?client_id={_configuration.GetValue<string>("Facebook_ClientId")}&client_secret={_configuration.GetValue<string>("Facebook_ClientSecret")}&grant_type=client_credentials");
			var response =
			await httpClient.GetFromJsonAsync<FacebookTokenValidationResult>(
				$"https://graph.facebook.com/debug_token?input_token={request.AccessToken}&access_token={appAccessTokenResponse!.AccessToken}");
			if (response is null || !response.Data.IsValid)
			{
				return false;
			}
			return true;	
		}

		private async Task<bool> ValidateGoogleToken(SocialLoginRequest request)
		{
			return true;
		}
		
	}
}
