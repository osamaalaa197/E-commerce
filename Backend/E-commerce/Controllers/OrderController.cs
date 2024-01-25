using AppCore.DTO;
using AppCore.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
		{
            _orderRepository=orderRepository;

        }
		[HttpPost]
		public ActionResult AddOrder(List<OrderDTO> Order)
		{
            var UserId = User.Claims.FirstOrDefault()?.Value;
			var result =_orderRepository.AddOrder(Order, UserId);	
			return Ok(result);

        }
        [HttpDelete]
		[Route("RemoveOrder")]
		public ActionResult RemoveOrder(int OrderId) 
		{
			var res= _orderRepository.RemoveOrder(OrderId);
			return Ok(res);

		}
		[HttpDelete]
		[Route("RemoveOrderItem")]
		public ActionResult RemoveOrderItem(int OrderId,int ProductId) 
		{
			var res= _orderRepository.RemoveOrderItem(OrderId, ProductId);
			return Ok(res);
		}
		[HttpGet]
		public ActionResult GetOrders()
		{
			var userId = User.Claims.FirstOrDefault().Value;
			var res = _orderRepository.GetOrders(userId);
			return Ok(res);
		}

	}
}
