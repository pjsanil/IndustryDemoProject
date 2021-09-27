using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IndustryDemo.Model
{
	public class Product
	{

		[Key]
		public int Id { get; set; }
		[Required(ErrorMessage = "Enter Customer Name")]
		public string Name { get; set; }
		public Int32 Price { get; set; }
		
	}
}
