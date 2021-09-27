using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IndustryDemo.Model;

namespace IndustryDemo.Model
{
	public class ApplicationDBContext:DbContext
	{
		public ApplicationDBContext(DbContextOptions<ApplicationDBContext>options):base(options)
		{

		}
		public DbSet<Customer> Customers { get; set; }
		public DbSet<Store> Store { get; set; }
		public DbSet<Product> Product { get; set; }
		public DbSet<IndustryDemo.Model.Sales> Sales { get; set; }
	}
}
