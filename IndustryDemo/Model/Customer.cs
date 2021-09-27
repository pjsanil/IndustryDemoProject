using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IndustryDemo.Model
{
	public class Customer
	{
		[Key]
		public int Id { get; set; }
		[Required(ErrorMessage="Enter Customer Name") ]
		public string Name { get; set; }
		public string Address { get; set; }
		
	}
}
