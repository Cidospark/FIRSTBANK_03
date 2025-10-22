using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagmeentSystem.Application.Services;
using EmployeeManagmeentSystem.Infrastructure.Data;
using EmployeeManagmeentSystem.Infrastructure.Identity;
using EmployeeManagmeentSystem.Infrastructure.Notificaation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeManagmeentSystem.Infrastructure
{
    public static class InfrastructureServicesConfig
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure PostgreSQL with Entity Framework Core
            services.AddDbContext<EMSDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true;
            }).AddEntityFrameworkStores<EMSDbContext>().AddDefaultTokenProviders();

            services.AddScoped<IMailService, MailService>();

            services.AddSwaggerGen();

            // other infrastructure services like (repositories, logging, etc.) will go in here...

            return services;
        }
    }
}