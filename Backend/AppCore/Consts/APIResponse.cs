using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.Consts
{
    public class APIResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public APIResponse(bool success, string message, object data)
        {
            Success = success;
            Message = message;
            Data = data;
        }

        public APIResponse()
        {
        }
    }
}
