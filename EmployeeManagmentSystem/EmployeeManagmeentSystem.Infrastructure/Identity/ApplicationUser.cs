using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmentSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace EmployeeManagmeentSystem.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string EmployeeId { get; set; } = "";
        public Employee? Employee { get; set; }
    }
}