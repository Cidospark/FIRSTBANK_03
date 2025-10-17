using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using TodoApp.Domain.Abstractions;

namespace TodoApp.Domain.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string PhotoUrl { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property for related Todo items
        public ICollection<Todo> Todos { get; set; } = [];
    }
}