using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Abstractions;
using EmployeeManagmeentSystem.Application.DTOs.Request;
using EmployeeManagmeentSystem.Application.DTOs.Response;

namespace EmployeeManagmeentSystem.Application.Services.Empoyee
{
    public interface IAuthService
    {
        Task<ResponseObject<LoginResponse>> Login(LoginRequest request);
        Task<ResponseObject<bool>> ResetPassword(ResetPasswordRequest request);
    }
}