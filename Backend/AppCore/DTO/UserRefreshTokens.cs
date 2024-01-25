using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.DTO
{
	public class UserRefreshTokens
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		public string RefreshToken { get; set; }
		public bool IsActive { get; set; } = true;
	}
}
