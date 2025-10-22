using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Infrastructure.Notification
{
    public class MailSettings
    {
        public string SenderEmail { get; set; } = "";
        public string Host { get; set; } = "";
        public string Port { get; set; } = "";
        public string AppPassword { get; set; } = "";
    }
}