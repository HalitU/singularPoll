
using System;
using System.Linq;
using System.Threading.Tasks;
using baseService.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace baseService.Channels
{
    public class ChatHub : Hub
    {
        private readonly PollContext pollContext;
        public ChatHub(PollContext pC){
            pollContext = pC;
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
        public Task SendVote(int vote, string groupName)
        {
            Console.WriteLine($"Reading {vote} from {Context.ConnectionId} who has the group {groupName}.");

            int pollID = Int32.Parse(groupName);
            Console.WriteLine("Poll Id: " + pollID);
            Poll currentPoll = pollContext.Polls.SingleOrDefault(p => p.PollId == pollID);
            
            Result res = pollContext.Results.SingleOrDefault(p => p.ResultId == vote);
            res.Votes++;
            // Don't forget to save changes
            var count = pollContext.SaveChanges();
            Console.WriteLine("{0} records saved to database", count);            

            return Clients.Group(groupName).SendAsync("ReceiveMessage", vote);
        }
        public Task SendMessage(string message, string groupName, string authorName)
        {
            Console.WriteLine($"Sending {message} to {Context.ConnectionId} who has the group {groupName}.");

            int pollID = Int32.Parse(groupName);
            Poll currentPoll = pollContext.Polls.SingleOrDefault(p => p.PollId == pollID);
            // Create new comment
            Comment sentComment = new Comment();
            sentComment.UserName = authorName;
            sentComment.PostDate = DateTime.Now;
            sentComment.Text = message;
            sentComment.Poll = currentPoll;
            sentComment.PollId = currentPoll.PollId;

            pollContext.Comments.Add(sentComment);
            // Don't forget to save changes
            var count = pollContext.SaveChanges();
            Console.WriteLine("{0} records saved to database", count);

            return Clients.Group(groupName).SendAsync("ReceiveMessage", message);
        }
    }
}