using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Repositories
{
    public interface ITodoRepository
    {
        Task AddTodoAsync(Todo todo);
        Task<Todo?> GetSingleTodoAsync(string todoId);
        Task<IQueryable<Todo>> GetAllTodosAsync();
        Task UpdateTodoAsync(Todo todo);
        Task DeleteTodoAsync(Todo todo);
    }
}