using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;

namespace TodoApp.Application.Services
{
    public interface ITodoService
    {
        Task<ResponseObject<TodoResponse>> AddTodoAsync(TodoRequest request);
        Task<ResponseObject<TodoResponse>> GetSingleTodoAsync(string todoId);
        Task<ResponseObject<IEnumerable<TodoResponse>>> GetAllTodosAsync(int page, int size);
        Task<ResponseObject<TodoResponse>> UpdateTodoAsync(string id, TodoRequest request);
        Task<ResponseObject<Boolean>> DeleteTodoAsync(string id); 
    }
}