using AppCore.DTO;
using E_commerce.Database;
using E_commerce.DTO;
using E_commerce.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace E_commerce.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly E_commerceDataBase _context;
        private readonly UserManager<Users> _userManager;
        private readonly IConfiguration _configuration;

        public UserController(E_commerceDataBase e_CommerceDataBase, UserManager<Users> userManager, IConfiguration configuration)
        {
            _context = e_CommerceDataBase;
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDTO userDTO)
        {
            var newUser = new Users
            {
                UserName = userDTO.UserName,
                Email = userDTO.Email,
                PhoneNumber = userDTO.PhoneNumber,
                Location = userDTO.Location,
            };
            var result = await _userManager.CreateAsync(newUser, userDTO.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, newUser.Id),
                new Claim(ClaimTypes.Role, "User")
            };
            await _userManager.AddClaimsAsync(newUser, claims);
            return NoContent();
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<TokenData>> LogIN(LogINDTO userDTO)
        {
            Users user = await _userManager.FindByNameAsync(userDTO.UserName);
            if (user == null)
            {
                return NotFound();
            }
            bool isAuthenticated = await _userManager.CheckPasswordAsync(user, userDTO.Password);
            if (!isAuthenticated)
            {
                return Unauthorized();
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

        [HttpGet]
        public ActionResult<Users> Profile(string id)
        {

            var user = _context.User.FirstOrDefault(p => p.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> SocialMediaResgister(SocialLoginRequest request) 
        {
            return Ok();
		}


    }
}
