using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Domain.Entities
{
    public class Role
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = "";

        //public ICollection<User>? User { get; set; }

        public List<UsersRoles> UsersRoles { get; set; } = [];
    }
}