using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmentSystem.Domain.Entities
{
    public class Employee
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public string Position { get; set; } = "";
        public DateTime DateHired { get; set; }
        public string PhotoUrl { get; set; } = "";
        public string DepartmentId { get; set; } = "";

        // entity relationship
        // Navigation property - each employee belongs to one department
        public Department? Department { get; set; }
    }
}