using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Identity;

namespace TodoApp.Infrastructure.Data
{
    public class TodoAppDbContext : IdentityDbContext<ApplicationUser>
    {
        public TodoAppDbContext(DbContextOptions<TodoAppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Todo> Todos { get; set; }

    }
}


        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);

        //     modelBuilder.Entity<User>().HasMany(u => u.Todos);
        // }