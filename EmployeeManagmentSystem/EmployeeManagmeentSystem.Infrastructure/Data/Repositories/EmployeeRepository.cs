using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Interfaces.Repositories;
using EmployeeManagmentSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagmeentSystem.Infrastructure.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EMSDbContext _context;
        public EmployeeRepository(EMSDbContext context)
        {
            _context = context;
        }
        public async Task AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(Employee employee)
        {
            _context.Employees.Remove(employee); 
            await _context.SaveChangesAsync();
        }

        public Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return Task.FromResult(_context.Employees.AsEnumerable());
        }

        public async Task<Employee?> GetEmployeeByIdAsync(string id)
        {
            return await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
        }

        public Task<IEnumerable<Employee>> GetEmployeesByDepartmentIdAsync(string departmentId)
        {
            return Task.FromResult(_context.Employees.Where(e => e.DepartmentId == departmentId).AsEnumerable());
        }

        public async Task UpdateEmployeeAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }
    }
}