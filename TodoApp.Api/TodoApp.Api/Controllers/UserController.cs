using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.Services;

namespace TodoApp.Api.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserRequest request)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.AddUserAsync(request);
            return CreatedAtAction(nameof(GetSingle), new { id = result.Data?.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle([FromRoute] string id)
        {
            var result = await _userService.GetSingleUserAsync(id);
            if (result.StatusCode == 200)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int page, [FromQuery] int size)
        {
            var result = await _userService.GetAllUsersAsync(page, size);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UserRequest request)
        {
            var result = await _userService.UpdateUserAsync(id, request);
            if (result.StatusCode == 200)
            {
                return Ok(result);
            }

            return NotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (result.StatusCode == 200)
            {
                return Ok(result);
            }

            return NotFound(result);
        }
    }
}