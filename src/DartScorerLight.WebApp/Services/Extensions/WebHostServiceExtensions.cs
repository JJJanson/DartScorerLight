using System.ServiceProcess;
using Microsoft.AspNetCore.Hosting;

namespace DartScorerLight.WebApp.Services.Extensions
{
    public static class WebHostServiceExtensions
    {
        public static void RunAsCustomService(this IWebHost host)
        {
            var webHostService = new WinHostService(host);
            ServiceBase.Run(webHostService);
        }
    }
}