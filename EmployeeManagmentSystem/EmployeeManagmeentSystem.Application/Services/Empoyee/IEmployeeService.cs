using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Abstractions;
using EmployeeManagmeentSystem.Application.DTOs.Request;
using EmployeeManagmeentSystem.Application.DTOs.Response;

namespace EmployeeManagmeentSystem.Application.Services.Empoyee
{
    public interface IEmployeeService
    {
        Task<ResponseObject<EmployeeResponse>> AddEmployeeAsync(EmployeeRequest request);
        Task<ResponseObject<EmployeeResponse>> GetEmployeeAsync(string departmentId);
        Task<ResponseObject<IEnumerable<EmployeeResponse>>> GetEmployeesAsync(GetAllOptions options);
        Task<ResponseObject<EmployeeResponse>> UpdateEmployeeAsync(string id, EmployeeRequest request);
        Task<ResponseObject<bool>> DeleteEmployeeAsync(string departmentId);
        Task<ResponseObject<IEnumerable<EmployeeResponse>>> GetEmployeesByDepartmentIdAsync(string departmentId);
    }
}