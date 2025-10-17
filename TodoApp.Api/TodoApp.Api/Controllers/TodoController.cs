using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.Services;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Api.Controllers
{
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ILogger<TodoController> _logger;
        private readonly ITodoService _todoService;

        public TodoController(ILogger<TodoController> logger, ITodoService todoService)
        {
            _logger = logger;
            _todoService = todoService;
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodoRequest request)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _todoService.AddTodoAsync(request);
            return CreatedAtAction(nameof(GetSingle), new { id = result.Data?.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle([FromRoute] string id)
        {
            var result = await _todoService.GetSingleTodoAsync(id);
            if (result.StatusCode == 200)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]int page, [FromQuery]int size)
        {
            var result = await _todoService.GetAllTodosAsync(page, size);
            return Ok(result);
        }
    }
}