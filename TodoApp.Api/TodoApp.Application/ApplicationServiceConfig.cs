using Microsoft.Extensions.DependencyInjection;
using TodoApp.Application.Mappers;
using TodoApp.Application.Services;

namespace TodoApp.Application
{
    public static class ApplicationServiceConfig
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITodoService, TodoService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddAutoMapper(typeof(TodoAppMappingProfile));
            return services;
        }
    }
}