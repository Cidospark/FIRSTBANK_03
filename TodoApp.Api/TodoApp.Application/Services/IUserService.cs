using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;

namespace TodoApp.Application.Services
{
    public interface IUserService
    {
        Task<ResponseObject<UserResponse>> AddUserAsync(UserRequest request);
        Task<ResponseObject<UserResponse>> GetSingleUserAsync(string userId);
        Task<ResponseObject<IEnumerable<UsersResponse>>> GetAllUsersAsync(int page, int size);
        Task<ResponseObject<UserResponse>> UpdateUserAsync(string id, UserRequest request);
        Task<ResponseObject<Boolean>> DeleteUserAsync(string id); 
    }
}