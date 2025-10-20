using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        //  a 1 - 1 relationship between the ApplicationUser (IdentityUser) && the User entity
        public string UserId { get; set; } = "";
        public User? User { get; set; }
    }
}