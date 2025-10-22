using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmeentSystem.Application.Services
{
    public interface IMailService
    {
        Task SendMessageAsync(string subject, List<string> recipients, string message);
    }
}