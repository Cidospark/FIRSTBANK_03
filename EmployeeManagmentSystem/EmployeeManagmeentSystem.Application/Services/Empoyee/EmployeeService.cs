using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Abstractions;
using EmployeeManagmeentSystem.Application.DTOs.Request;
using EmployeeManagmeentSystem.Application.DTOs.Response;
using EmployeeManagmeentSystem.Application.Interfaces.Repositories;

namespace EmployeeManagmeentSystem.Application.Services.Empoyee
{
    public class EmployeeService : IEmployeeService
    {
        public Task<ResponseObject<EmployeeResponse>> AddEmployeeAsync(EmployeeRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseObject<bool>> DeleteEmployeeAsync(string departmentId)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseObject<EmployeeResponse>> GetEmployeeAsync(string departmentId)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseObject<IEnumerable<EmployeeResponse>>> GetEmployeesAsync(GetAllOptions options)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseObject<IEnumerable<EmployeeResponse>>> GetEmployeesByDepartmentIdAsync(string departmentId)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseObject<EmployeeResponse>> UpdateEmployeeAsync(string id, EmployeeRequest request)
        {
            throw new NotImplementedException();
        }
    }
}