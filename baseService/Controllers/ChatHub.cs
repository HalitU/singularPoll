
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace baseService.Controllers
{
    public class ChatHub : Hub
    {
        public Task SendMessage(string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}