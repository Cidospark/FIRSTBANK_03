using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Abstractions;
using EmployeeManagmeentSystem.Application.DTOs.Response;

namespace EmployeeManagmeentSystem.Application.Services.Empoyee
{
    public interface IEmployeeService
    {
        Task<ResponseObject<EmployeeResponse>> AddEmployeeAsync();
        Task<ResponseObject<EmployeeResponse>> GetEmployeeAsync(string id);
        Task<ResponseObject<IEnumerable<EmployeeResponse>>> GetEmployeesAsync(GetAllOptions options);
    }
}