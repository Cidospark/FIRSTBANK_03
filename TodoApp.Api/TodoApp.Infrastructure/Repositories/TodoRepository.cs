using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoApp.Application.Repositories;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoAppDbContext _context;
        public TodoRepository(TodoAppDbContext context)
        {
            _context = context;
        }
        
        public async Task AddTodoAsync(Todo todo)
        {
            await _context.AddAsync(todo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodoAsync(Todo todo)
        {
            _context.Remove(todo);
            await _context.SaveChangesAsync();
        }

        public async Task<IQueryable<Todo>> GetAllTodosAsync()
        {
            return await Task.FromResult(_context.Todos.AsQueryable());
        }

        public async Task<Todo?> GetSingleTodoAsync(string todoId)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == todoId);
            return todo;
        }

        public async Task UpdateTodoAsync(Todo todo)
        {
            _context.Update(todo);
            await _context.SaveChangesAsync();
        }
    }
}