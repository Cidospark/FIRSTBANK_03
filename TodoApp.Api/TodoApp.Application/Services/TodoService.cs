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
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;
        public TodoService(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
        }

        public async Task<ResponseObject<TodoResponse>> AddTodoAsync(TodoRequest request)
        {
            var todoToAdd = _mapper.Map<Todo>(request);
            await _todoRepository.AddTodoAsync(todoToAdd);
            var todoToReturn = _mapper.Map<TodoResponse>(todoToAdd);

            return new ResponseObject<TodoResponse>
            {
                StatusCode = 201,
                Message = "Todo Created!",
                Data = todoToReturn
            };
        }

        public async Task<ResponseObject<bool>> DeleteTodoAsync(string id)
        {
            var res = new ResponseObject<bool>();
            var todo = await _todoRepository.GetSingleTodoAsync(id);
            if (todo != null)
            {
                await _todoRepository.DeleteTodoAsync(todo);
                res.StatusCode = 200;
                res.Message = "Deleted!";
                res.Data = true;
            }
            else
            {
                res.StatusCode = 404;
                res.Message = "Not found.";
                res.Errors = new List<string> { $"Could not find todo with id: {id}" };
            }
            return res;
            
        }

        public async Task<ResponseObject<IEnumerable<TodoResponse>>> GetAllTodosAsync(int page, int size)
        {
            var offset = PaginationHelper.GetOffset(page, size);
            size = offset <= 0 ? 10 : size;
            
            var todos = await _todoRepository.GetAllTodosAsync();
            return new ResponseObject<IEnumerable<TodoResponse>>
            {
                StatusCode = 200,
                Message = "List of todos found",
                Data = todos.Skip(offset).Take(size)
                    .Select(todo => _mapper.Map<TodoResponse>(todo)).ToList()
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
                res.Data = _mapper.Map<TodoResponse>(todo);
            }
            return res;
        }

        public async Task<ResponseObject<IEnumerable<TodoResponse>>> GetTodosByUserId(string userId, int page, int size)
        {
            var offset = PaginationHelper.GetOffset(page, size);
            size = offset <= 0 ? 10 : size;
            
            var todos = await _todoRepository.GetAllTodosAsync();

            var userTodos = todos.Where(t => t.UserId == userId);

            return new ResponseObject<IEnumerable<TodoResponse>>
            {
                StatusCode = 200,
                Message = "List of todos found",
                Data = userTodos.Skip(offset).Take(size)
                    .Select(todo => _mapper.Map<TodoResponse>(todo)).ToList()
            };
        }

        public async Task<ResponseObject<TodoResponse>> UpdateTodoAsync(string id, TodoRequest request)
        {
            var res = new ResponseObject<TodoResponse>();
            var todo = await _todoRepository.GetSingleTodoAsync(id);
            if (todo != null)
            {
                // update the todo object
                var todoToUpdate = _mapper.Map<TodoRequest, Todo>(request, todo);
                await _todoRepository.UpdateTodoAsync(todo);
                res.StatusCode = 200;
                res.Message = "Updated!";
                res.Data = _mapper.Map<TodoResponse>(todoToUpdate);
            }
            else
            {
                res.StatusCode = 404;
                res.Message = "Not found.";
                res.Errors = new List<string> { $"Could not find todo with id: {id}" };
            }
            return res;
        }
    }
}