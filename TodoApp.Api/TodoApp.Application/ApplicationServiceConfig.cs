using Microsoft.Extensions.DependencyInjection;
using TodoApp.Application.Services;

namespace TodoApp.Application
{
    public static class ApplicationServiceConfig
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITodoService, TodoService>();
            return services;
        }
    }
}