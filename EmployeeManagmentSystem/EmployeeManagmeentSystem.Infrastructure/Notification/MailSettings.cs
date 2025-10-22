using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmeentSystem.Infrastructure.Notificaation
{
    public class MailSettings
    {
        public string Mail { get; set; } = string.Empty;
        public string AppName { get; set; } = string.Empty;
        public string AppPassword { get; set; } = string.Empty;
        public string Host { get; set; } = string.Empty;
        public int Port { get; set; }
    }
}