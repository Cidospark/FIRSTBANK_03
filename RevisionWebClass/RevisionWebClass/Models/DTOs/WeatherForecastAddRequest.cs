using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RevisionWebClass.Models.DTOs
{
    public class WeatherForecastAddRequest
    {
        [Required(ErrorMessage ="TemperatureC is required!")]
        public int TemperatureC { get; set; }

        [Required(ErrorMessage ="Summary is required!")]
        public string? Summary { get; set; }
    }
}