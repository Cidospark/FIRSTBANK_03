using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Abstractions;
using EmployeeManagmeentSystem.Application.DTOs.Request;
using EmployeeManagmeentSystem.Application.DTOs.Response;

namespace EmployeeManagmeentSystem.Application.Services.Department
{
    public interface IDepartmentService
    {
        Task<ResponseObject<DepartmentResponse>> AddDepartmentAsync(DepartmentRequest request);
        Task<ResponseObject<DepartmentResponse>> GetDepartmentByIdAsync(string employeeId);
        Task<ResponseObject<IEnumerable<DepartmentResponse>>> GetAllDepartmentsAsync();
        Task<ResponseObject<DepartmentResponse>> UpdateDepartmentAsync(string employeeId, DepartmentRequest request);
        Task<ResponseObject<bool>> DeleteDepartmentAsync(string employeeId);
    }
}