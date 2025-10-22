using EmployeeManagmeentSystem.Application.Services;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;

namespace EmployeeManagmeentSystem.Infrastructure.Notificaation
{
    public class MailService : IMailService
    {
        private readonly IConfiguration _configuration;
        private readonly MailSettings _mailSettings;
        public MailService(IConfiguration configuration, IOptions<MailSettings> mailSettings)
        {
            // inject mailSettings options and configuration interface
            _configuration = configuration;
            _mailSettings = mailSettings.Value;
        }
        public async Task SendMessageAsync(string subject, List<string> recipients, string message)
        {
            // create email object
            var email = new MimeMessage();

            // add the sender email address
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);

            // add recipients email address
            foreach (var em in recipients)
            {
                email.To.Add(MailboxAddress.Parse(em));
            }

            // add subject
            email.Subject = subject;

            // build the mail body and add message
            var mailBodyBuilder = new BodyBuilder();
            mailBodyBuilder.HtmlBody = @$"
            <h1>{message}</h1>
            <p>Have fun with dotnet!</p>
            ";
            email.Body = mailBodyBuilder.ToMessageBody();

            // send mail
            using var smtp = new SmtpClient();
            smtp.CheckCertificateRevocation = true;
            await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, true);
            await smtp.AuthenticateAsync(_mailSettings.Mail, _mailSettings.AppPassword);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}