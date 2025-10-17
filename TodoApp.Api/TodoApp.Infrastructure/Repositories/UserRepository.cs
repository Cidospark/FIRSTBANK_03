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
    public class UserRepository : IUserRepository
    {
        private readonly TodoAppDbContext _context;
        public UserRepository(TodoAppDbContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(User user)
        {
            _context.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<IQueryable<User>> GetAllUsersAsync()
        {
            return await Task.FromResult(_context.Users.AsQueryable());
        }

        public async Task<User?> GetSingleUserAsync(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}