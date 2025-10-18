using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Infrastructure.Identity;
using EmployeeManagmentSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagmeentSystem.Infrastructure.Data
{
    public class EMSDbContext : IdentityDbContext<ApplicationUser>
    {
        public EMSDbContext(DbContextOptions<EMSDbContext> options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}