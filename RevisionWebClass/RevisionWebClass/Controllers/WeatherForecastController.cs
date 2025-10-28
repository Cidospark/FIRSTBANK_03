using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RevisionWebClass.Data;
using RevisionWebClass.Models;
using RevisionWebClass.Models.DTOs;

namespace RevisionWebClass.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    // private static readonly string[] Summaries = new[]
    // {
    //     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    // };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly MyDbContext _context;

    public WeatherForecastController(
        ILogger<WeatherForecastController> logger,
        MyDbContext context
    )
    {
        _logger = logger;
        _context = context;
    }


    [HttpPost]
    public async Task<IActionResult> Add([FromBody] WeatherForecastAddRequest request)
    {
        // validate request
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // map request to entity type
        var dataToAdd = new WeatherForecast
        {
            Id = Guid.NewGuid(),
            Date = DateOnly.FromDateTime(DateTime.UtcNow),
            TemperatureC = request.TemperatureC,
            Summary = request.Summary
        };

        try
        {
            await _context.AddAsync(dataToAdd);
            await _context.SaveChangesAsync();

        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
        }

        return Ok(new WeatherForecastAddResponse
        {
            Id = dataToAdd.Id,
            Date = dataToAdd.Date,
            TemperatureC = dataToAdd.TemperatureC,
            Summary = dataToAdd.Summary
        });
    }


    [HttpGet]
    public  IActionResult Get(int page, int size)
    {
        page = page < 1 ? 1 : page;
        size = size < 1 ? 10 : size;
        var offset = (page - 1) * size;
        var result = _context.WeatherForecasts.AsQueryable();
        if (result != null && result.Any())
        {
            result = result.Skip(offset).Take(size);
        }
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSingle(Guid id)
    {
        var result = await _context.WeatherForecasts.FirstOrDefaultAsync(x => x.Id == id);
        if (result == null)
        {
            return NotFound($"Could not find result with id {id}");
        }

        return Ok(new WeatherForecastAddResponse
        {
            Id = result.Id,
            Date = result.Date,
            TemperatureC = result.TemperatureC,
            Summary = result.Summary
        });

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
         var result = await _context.WeatherForecasts.FirstOrDefaultAsync(x => x.Id == id);
        if (result == null)
        {
            return NotFound($"Could not find result with id {id}");
        }

        _context.Remove(result);
        await _context.SaveChangesAsync(); // I forgot to add this earlier and it could not delete the item.

        return NoContent();

    }
}

/*
 [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
*/