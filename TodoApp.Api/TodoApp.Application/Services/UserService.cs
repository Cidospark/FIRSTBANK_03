using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Application.Repositories;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITodoRepository _todoRepo;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IMapper mapper, ITodoRepository todoRepo)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _todoRepo = todoRepo;
        }

        public async Task<ResponseObject<UserResponse>> AddUserAsync(UserRequest request)
        {
            var userToAdd = _mapper.Map<User>(request);
            await _userRepository.AddUserAsync(userToAdd);
            var userToReturn = _mapper.Map<UserResponse>(userToAdd);

            return new ResponseObject<UserResponse>
            {
                StatusCode = 201,
                Message = "User Created!",
                Data = userToReturn
            };
        }

        public async Task<ResponseObject<bool>> DeleteUserAsync(string id)
        { 
            var res = new ResponseObject<bool>();
            var user = await _userRepository.GetSingleUserAsync(id);
            if (user != null)
            {
                await _userRepository.DeleteUserAsync(user);
                res.StatusCode = 200;
                res.Message = "Deleted!";
                res.Data = true;
            }
            else
            {
                res.StatusCode = 404;
                res.Message = "Not found.";
                res.Errors = new List<string> { $"Could not find user with id: {id}" };
            }
            return res;
        }

        public async Task<ResponseObject<IEnumerable<UsersResponse>>> GetAllUsersAsync(int page, int size = 10)
        {
            var offset = PaginationHelper.GetOffset(page, size);
            size = offset <= 0 ? 10 : size;

            var users = await _userRepository.GetAllUsersAsync();
            return new ResponseObject<IEnumerable<UsersResponse>>
            {
                StatusCode = 200,
                Message = "List of users found",
                Data = users.Skip(offset).Take(size)
                    .Select(user => _mapper.Map<UsersResponse>(user)).ToList()
            };
        }

        public async Task<ResponseObject<UserResponse>> GetSingleUserAsync(string userId)
        {
            var res = new ResponseObject<UserResponse>();
            var user = await _userRepository.GetSingleUserAsync(userId);
            if (user == null)
            {
                res.StatusCode = 404;
                res.Message = "Not found!";
                res.Errors = new List<string> { $"Could not find user with id: {userId}" };
            }
            else
            {
                var userTodos = (await _todoRepo.GetAllTodosAsync()).Where(t => t.UserId == user.Id);
                user.Todos = [..userTodos]; // using spred operator to convert Iqueryable result to list

                res.StatusCode = 200;
                res.Message = "Todo found.";
                res.Data = _mapper.Map<UserResponse>(user);
            }
            return res;
        }

        public async Task<ResponseObject<UserResponse>> UpdateUserAsync(string id, UserRequest request)
        {
            var res = new ResponseObject<UserResponse>();
            var user = await _userRepository.GetSingleUserAsync(id);
            if (user != null)
            {
                // update the todo object
                var userToUpdate = _mapper.Map<UserRequest, User>(request, user);
                await _userRepository.UpdateUserAsync(user);
                res.StatusCode = 200;
                res.Message = "Updated!";
                res.Data = _mapper.Map<UserResponse>(userToUpdate);
            }
            else
            {
                res.StatusCode = 404;
                res.Message = "Not found.";
                res.Errors = new List<string> { $"Could not find user with id: {id}" };
            }
            return res;
        }
    }
}