using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IndustryDemo.Model
{
	public class Sales
	{
		[Key]
		public int Id { get; set; }
		public int Productid { get; set; }
		public int Customerid { get; set; }
		public int StoreId { get; set; }
		public DateTime DateSold { get; set; }
		public Customer Customer { get; set; }
		public Product Product { get; set; }
		public Store Store { get; set; }
	}
}
