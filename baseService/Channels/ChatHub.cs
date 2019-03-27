
using System;
using System.Linq;
using System.Threading.Tasks;
using baseService.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace baseService.Channels
{
    public class ChatHub : Hub, IChatHub
    {
        private readonly IPollRepository _repository;
        public ChatHub(IPollRepository repository){
            _repository = repository;
        }
        public async Task AddToGroup(string groupName)
        {
            Console.WriteLine($"{Context.ConnectionId} has joined the group {groupName}.");
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }
        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }        
        public async Task SendVote(int vote, string groupName)
        {
            try{
                int pollID = Int32.Parse(groupName);
                await _repository.IncrementVote(vote, pollID);

                await Clients.Group(groupName).SendAsync("ReceiveMessage", vote);
            }catch{
                // Return error message to caller
                await Clients.Caller.SendAsync("ReceiveMessage", "Error# An exception occured please try again.");
            }
        }
        public async Task SendMessage(string message, string groupName, string authorName)
        {
            try{
                int pollID = Int32.Parse(groupName);

                await _repository.AddComment(authorName, message, pollID);

                await Clients.Group(groupName).SendAsync("ReceiveMessage", message);
            }catch{
                // Return error message to caller
                await Clients.Caller.SendAsync("ReceiveMessage", "Error# An exception occured please try again.");
            }
        }
    }
}