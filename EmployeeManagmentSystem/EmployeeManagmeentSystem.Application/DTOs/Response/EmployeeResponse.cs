using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmeentSystem.Application.DTOs.Response
{
    public class EmployeeResponse
    {
        public string Id { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Position { get; set; } = "";
        public DateTime DateHired { get; set; }
        public string PhotoUrl { get; set; } = "";
        public string DepartmentId { get; set; } = ""; 
        public string DepartmentName { get; set; } = "";
    }
}