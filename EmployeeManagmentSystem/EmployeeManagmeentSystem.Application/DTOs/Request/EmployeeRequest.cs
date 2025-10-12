using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmeentSystem.Application.DTOs.Request
{
    public class EmployeeRequest
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Position { get; set; } = "";
        public DateTime DateHired { get; set; }
        public string DepartmentId { get; set; } = ""; 
    }
}