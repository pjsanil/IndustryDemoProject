
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IndustryDemo.Model
{
	public class Store
	{

		[Key]
		public int Id { get; set; }
		[Required(ErrorMessage = "Enter store Name")]
		public string Name { get; set; }
		public string Address { get; set; }
		
	}
}
