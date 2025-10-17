using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Application.Repositories;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;
        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<ResponseObject<TodoResponse>> AddTodoAsync(TodoRequest request)
        {
            var todoToAdd = new Todo
            {
                Title = request.Title,
                Description = request.Description,
                UserId = request.UserId
            };
            await _todoRepository.AddTodoAsync(todoToAdd);
            var todoToReturn = new TodoResponse
            {
                Id = todoToAdd.Id,
                Title = todoToAdd.Title,
                Description = todoToAdd.Description,
                IsCompleted = todoToAdd.IsCompleted,
                DueDate = todoToAdd.DueDate,
                UserId = todoToAdd.UserId,
                CreatedAt = todoToAdd.CreatedAt,
                UpdatedAt = todoToAdd.UpdatedAt
            };

            return new ResponseObject<TodoResponse>
            {
                StatusCode = 200,
                Message = "Todo Created!",
                Data = todoToReturn
            };
        }

        public Task<ResponseObject<bool>> DeleteTodoAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseObject<IEnumerable<TodoResponse>>> GetAllTodosAsync(int page, int size)
        {
            page = page < 1 ? 1 : page;
            size = size < 1 ? 10 : size;
            var offset = (page - 1) * size;
            var todos = await _todoRepository.GetAllTodosAsync();
            return new ResponseObject<IEnumerable<TodoResponse>>
            {
                StatusCode = 200,
                Message = "List of todos found",
                Data = todos.Skip(offset).Take(size)
                    .Select(todo => new TodoResponse
                    {
                        Id = todo.Id,
                        Title = todo.Title,
                        Description = todo.Description,
                        IsCompleted = todo.IsCompleted,
                        DueDate = todo.DueDate,
                        UserId = todo.UserId,
                        CreatedAt = todo.CreatedAt,
                        UpdatedAt = todo.UpdatedAt
                    }).ToList()
            };
        }

        public async Task<ResponseObject<TodoResponse>> GetSingleTodoAsync(string todoId)
        {
            var res = new ResponseObject<TodoResponse>();
            var todo = await _todoRepository.GetSingleTodoAsync(todoId);
            if (todo == null)
            {
                res.StatusCode = 404;
                res.Message = "Not found!";
                res.Errors = new List<string> { $"Could not find todo with id: {todoId}" };
            }
            else
            {
                res.StatusCode = 200;
                res.Message = "Todo found.";
                res.Data = new TodoResponse
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted,
                    DueDate = todo.DueDate,
                    UserId = todo.UserId,
                    CreatedAt = todo.CreatedAt,
                    UpdatedAt = todo.UpdatedAt
                };
            }
            return res;
        }

        public Task<ResponseObject<TodoResponse>> UpdateTodoAsync(string id, TodoRequest request)
        {
            throw new NotImplementedException();
        }
    }
}