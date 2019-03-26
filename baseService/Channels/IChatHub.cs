
using System;
using System.Linq;
using System.Threading.Tasks;
using baseService.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace baseService.Channels
{
    public interface IChatHub
    {
        Task AddToGroup(string groupName);
        Task RemoveFromGroup(string groupName);     
        Task SendVote(int vote, string groupName);
        Task SendMessage(string message, string groupName, string authorName);
    }
}