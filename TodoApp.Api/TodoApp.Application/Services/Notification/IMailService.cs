using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.Services.Notification
{
    public interface IMailService
    {
        Task SendMessage(string subject, List<string> recipients, string message);
    }
}