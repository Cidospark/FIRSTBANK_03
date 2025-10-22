using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using TodoApp.Application.Services.Notification;

namespace TodoApp.Infrastructure.Notification
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IConfiguration config)
        {
            var senderEmail = config["MailSettings:SenderEmail"];
            var host = config["MailSettings:Host"];
            var port = config["MailSettings:Port"];
            var appPassword = config["MailSettings:AppPassword"];

            _mailSettings = new MailSettings
            {
                SenderEmail = senderEmail ?? "",
                Host = host ?? "smtp.gmail.com",
                Port = port ?? "465",
                AppPassword = appPassword ?? ""
            };
        }

        public async Task SendMessage(string subject, List<string> recipients, string message)
        {
            try
            {
                // create the email object
                var email = new MimeMessage();

                // add the sender email
                email.Sender = MailboxAddress.Parse(_mailSettings.SenderEmail);

                // add the recipients' emails
                recipients.ForEach(r => {
                    email.To.Add(MailboxAddress.Parse(r));
                });

                // add subject
                email.Subject = subject;

                // add message or email body
                var emailBodyBuilder = new BodyBuilder();
                emailBodyBuilder.HtmlBody = message;
                email.Body = emailBodyBuilder.ToMessageBody();

                // send mail
                using (var smtp = new SmtpClient())
                {
                    smtp.CheckCertificateRevocation = true;
                    await smtp.ConnectAsync(_mailSettings.Host, Convert.ToInt32(_mailSettings.Port), true);
                    await smtp.AuthenticateAsync(_mailSettings.SenderEmail, _mailSettings.AppPassword);
                    await smtp.SendAsync(email);
                    await smtp.DisconnectAsync(true);
                }
            }
            catch
            {
                // log error to file
                throw;
            }
        }
    }
}