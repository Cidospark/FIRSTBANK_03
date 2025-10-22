using System.Net;
using EmployeeManagmeentSystem.Infrastructure;
using EmployeeManagmeentSystem.Infrastructure.Notificaation;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

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
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        var error = context.Features.Get<IExceptionHandlerFeature>();
        var errorQuery = context.Request.Query;
        var errorPath = context.Request.Path;
        var errorTraceId = context.TraceIdentifier;
        Console.WriteLine($"{error} - from program file.");
        Console.WriteLine($"Query - {errorQuery}");
        Console.WriteLine($"Path - {errorPath}");
        Console.WriteLine($"TraceId - {errorTraceId}");
    }));
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
