using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Identity
{
    public interface IAuthService
    {
        Task<ResponseObject<UserResponse>> RegisterUser(UserRequest request);
        Task<ResponseObject<LoginResponse>> Login(LoginRequest request);
    }
}