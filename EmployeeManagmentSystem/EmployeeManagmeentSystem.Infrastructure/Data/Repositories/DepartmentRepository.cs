using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Interfaces.Repositories;
using EmployeeManagmentSystem.Domain.Entities;

namespace EmployeeManagmeentSystem.Infrastructure.Data.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly EMSDbContext _context;
        public DepartmentRepository(EMSDbContext context)
        {
            _context = context;
        }
        public async Task AddDepartmentAsync(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDepartmentAsync(Department department)
        {
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
        }

        public Task<IEnumerable<Department>> GetAllDepartmentsAsync()
        {
            return Task.FromResult(_context.Departments.AsEnumerable());
        }

        public Task<Department?> GetDepartmentByIdAsync(string id)
        {
            return Task.FromResult(_context.Departments.FirstOrDefault(d => d.Id == id));
        }

        public async Task UpdateDepartmentAsync(Department department)
        {
            _context.Departments.Update(department);
            await _context.SaveChangesAsync();
        }
    }
}