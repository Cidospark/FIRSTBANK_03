using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Domain.Entities
{
    public class UsersRoles
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserId { get; set; } = "";
        public string RoleId { get; set; } = "";

        public User? User { get; set; }
        public Role? Role { get; set; }
    }
}