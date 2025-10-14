using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmentSystem.Domain.Entities;

namespace EmployeeManagmeentSystem.Application.Interfaces.Repositories
{
    public interface IEmployeeRepository
    {
        Task AddEmployeeAsync(Employee employee);
        Task<Employee?> GetEmployeeByIdAsync(string id);
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(Employee employee);
        Task<IEnumerable<Employee>> GetEmployeesByDepartmentIdAsync(string departmentId);
    }
}