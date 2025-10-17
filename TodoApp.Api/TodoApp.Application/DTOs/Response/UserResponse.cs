using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.DTOs.Response
{
    public class UserResponse
    {
        public string Id { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";  

        public List<TodoResponse> Todos { get; set; } = [];
    }
}