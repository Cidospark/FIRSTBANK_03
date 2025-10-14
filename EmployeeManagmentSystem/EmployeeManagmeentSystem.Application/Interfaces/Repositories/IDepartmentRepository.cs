using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmentSystem.Domain.Entities;

namespace EmployeeManagmeentSystem.Application.Interfaces.Repositories
{
    public interface IDepartmentRepository
    {
        Task AddDepartmentAsync(Department department);
        Task<Department?> GetDepartmentByIdAsync(string id);
        Task<IEnumerable<Department>> GetAllDepartmentsAsync();
        Task UpdateDepartmentAsync(Department department);
        Task DeleteDepartmentAsync(Department department);
    }
}