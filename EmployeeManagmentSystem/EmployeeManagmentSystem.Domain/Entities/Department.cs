using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmentSystem.Domain.Entities
{
    public class Department
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";

        // entity relationship
        // Navigation property - each department can have multiple employees
        public ICollection<Employee> Employees { get; set; } = [];
    }
}