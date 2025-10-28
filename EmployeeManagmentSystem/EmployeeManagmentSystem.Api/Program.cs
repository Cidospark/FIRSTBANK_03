using System.Net;
using EmployeeManagmeentSystem.Infrastructure;
using EmployeeManagmeentSystem.Infrastructure.Notificaation;
using Microsoft.AspNetCore.Diagnostics;
using NLog.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
// Configure NLog
builder.Services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.SetMinimumLevel(LogLevel.Trace);
});

// Add NLog as the logger provider
builder.Services.AddSingleton<ILoggerProvider, NLogLoggerProvider>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.MapOpenApi();
    app.UseExceptionHandler(builder => builder.Run(async context =>
    {
        var logger = app.Services.GetRequiredService<ILogger<ILoggerProvider>>();
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        var error = context.Features.Get<IExceptionHandlerFeature>();
        var errorQuery = context.Request.Query;
        var errorPath = context.Request.Path;
        var errorTraceId = context.TraceIdentifier;
        logger.LogError($"{error.Error.Message} - from program file.");
        logger.LogError($"Query - {errorQuery}");
        logger.LogError($"Path - {errorPath}");
        logger.LogError($"TraceId - {errorTraceId}");
    }));
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
