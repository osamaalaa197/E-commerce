using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.DTO
{
    public class ReadProductDTO
    {
        public string Title { get; set; }
        public string Descirption { get; set; }
        public string Product_Location { get; set; }
        public string Supplier { get; set; }
        public double Price { get; set; }
        public string ImagUrl { get; set; }
    }
}
