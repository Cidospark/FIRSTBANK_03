using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Services
{
    public interface IAuthService
    {
        Task<string> GenerateAccessToken(User user, List<string> roles, List<Claim> claims);
        Task<LoginResponse> Login(LoginRequest request);
    }
}