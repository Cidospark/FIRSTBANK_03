using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TodoApp.Application.Repositories;
using TodoApp.Infrastructure.Data;
using TodoApp.Infrastructure.Repositories;

namespace TodoApp.Infrastructure
{
    public static class InfrastructureServicesConfig
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<TodoAppDbContext>(options =>
            {
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<ITodoRepository, TodoRepository>();

            return services;
        }
    }
}