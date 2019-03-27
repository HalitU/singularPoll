using baseService.Models;
using Xunit;
using Microsoft.EntityFrameworkCore;

using Moq;
using System.Collections.Generic;
using System.Linq;
using baseService.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using baseService.Channels;
using System.Threading;
using System;

namespace baseService.Tests
{
    public class ChatHubTest
    {
        [Fact]
        public async Task AddToGroupValid()
        {
            const string GROUP_NAME = "test";
            const string CONNECTION_ID = "connection_id";

            var repository = new Mock<IPollRepository>();
            var callerClients = new Mock<IHubCallerClients>();
            var groupManager = new Mock<IGroupManager>();
            var context = new Mock<HubCallerContext>();
            var proxy = new Mock<IClientProxy>();

            context.SetupGet(i => i.ConnectionId)
                .Returns(CONNECTION_ID);

            callerClients.Setup(c => c.All).Returns(proxy.Object);
            callerClients.Setup(c => c.Caller).Returns(proxy.Object);
            callerClients.Setup(c => c.Group(GROUP_NAME)).Returns(callerClients.Object.All);

            var chatHub = new ChatHub(repository.Object);
            chatHub.Groups = groupManager.Object;
            chatHub.Clients = callerClients.Object;
            chatHub.Context = context.Object;

            await chatHub.AddToGroup(GROUP_NAME);

            // you have to make sure that the method is called.
            // this is only way to test the AddToGroup method
            callerClients.Verify(c => c.All, Times.Once);
            groupManager.Verify(c => c.AddToGroupAsync(CONNECTION_ID, GROUP_NAME, new CancellationToken()), Times.Once);
        }
        [Fact]
        public async Task RemoveUserFromGroupTest()
        {
            const string GROUP_NAME = "test";
            const string CONNECTION_ID = "connection_id";

            var repository = new Mock<IPollRepository>();
            var callerClients = new Mock<IHubCallerClients>();
            var groupManager = new Mock<IGroupManager>();
            var context = new Mock<HubCallerContext>();
            var proxy = new Mock<IClientProxy>();

            context.SetupGet(i => i.ConnectionId)
                .Returns(CONNECTION_ID);

            callerClients.Setup(c => c.All).Returns(proxy.Object);
            callerClients.Setup(c => c.Caller).Returns(proxy.Object);
            callerClients.Setup(c => c.Group(GROUP_NAME)).Returns(callerClients.Object.All);

            var chatHub = new ChatHub(repository.Object);
            chatHub.Groups = groupManager.Object;
            chatHub.Clients = callerClients.Object;
            chatHub.Context = context.Object;

            await chatHub.RemoveFromGroup(GROUP_NAME);

            // you have to make sure that the method is called.
            // this is only way to test the AddToGroup method
            callerClients.Verify(c => c.All, Times.Once);
            groupManager.Verify(c => c.RemoveFromGroupAsync(CONNECTION_ID, GROUP_NAME, new CancellationToken()), Times.Once);
        }        
        [Fact]
        public async Task SendingVoteForPollTest()
        {
            // Create dbcontext and add the Poll object
            Poll obj = new Poll();
            obj.PollId = 1;
            obj.PollQuestion = "Whats up?";
            obj.Results = getAResultList().ToList();

            var mockRepository = new Mock<IPollRepository>();
            mockRepository.Setup(p => p.AddPoll(obj)).Returns(getAPoll(obj));
            
            ValuesController controller = new ValuesController(mockRepository.Object);
            ActionResult<Poll> result = controller.Post(obj).Result;

            var mockClients = new Mock<IHubCallerClients>();
            var mockClientProxy = new Mock<IClientProxy>();
            var mockContext = new Mock<HubCallerContext>();
            var mockGroup = new Mock<IGroupManager>();

            mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Caller).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Group("1")).Returns(mockClients.Object.All);
            
            mockContext.Setup(c => c.ConnectionId).Returns("123");

            var myHub = new ChatHub(mockRepository.Object);
            myHub.Groups = mockGroup.Object;
            myHub.Clients = mockClients.Object;
            myHub.Context = mockContext.Object;

            // Add this hub to group
            await myHub.AddToGroup("1");

            // Finally test
            await myHub.SendVote(1, "1");

            mockClients.Verify(c => c.All, Times.Once);   
        }
        [Fact]
        public async Task SendingVoteForPollFailTest()
        {
            // Create dbcontext and add the Poll object
            Poll obj = new Poll();
            obj.PollId = 1;
            obj.PollQuestion = "Whats up?";
            obj.Results = getAResultList().ToList();

            var mockRepository = new Mock<IPollRepository>();
            mockRepository.Setup(p => p.AddPoll(obj)).Returns(getAPoll(obj));
            
            ValuesController controller = new ValuesController(mockRepository.Object);
            ActionResult<Poll> result = controller.Post(obj).Result;

            var mockClients = new Mock<IHubCallerClients>();
            var mockClientProxy = new Mock<IClientProxy>();
            var mockContext = new Mock<HubCallerContext>();
            var mockGroup = new Mock<IGroupManager>();

            mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Caller).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Group("1")).Returns(mockClients.Object.All);
            
            mockContext.Setup(c => c.ConnectionId).Returns("123");

            var myHub = new ChatHub(mockRepository.Object);
            myHub.Groups = mockGroup.Object;
            myHub.Clients = mockClients.Object;
            myHub.Context = mockContext.Object;

            // Finally test
            await myHub.SendVote(1, "2");

            mockClients.Verify(c => c.Caller, Times.Once);   
        }                
        [Fact]
        public async void SendingMessageForPollTest()
        {
            // Create dbcontext and add the Poll object
            Poll obj = new Poll();
            obj.PollId = 1;
            obj.PollQuestion = "Whats up?";
            obj.Results = getAResultList().ToList();

            var mockRepository = new Mock<IPollRepository>();
            mockRepository.Setup(p => p.AddPoll(obj)).Returns(getAPoll(obj));
            
            ValuesController controller = new ValuesController(mockRepository.Object);
            ActionResult<Poll> result = controller.Post(obj).Result;

            var mockClients = new Mock<IHubCallerClients>();
            var mockClientProxy = new Mock<IClientProxy>();
            var mockContext = new Mock<HubCallerContext>();
            var mockGroup = new Mock<IGroupManager>();

            mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Caller).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Group("1")).Returns(mockClients.Object.All);
            
            mockContext.Setup(c => c.ConnectionId).Returns("123");

            var myHub = new ChatHub(mockRepository.Object);
            myHub.Groups = mockGroup.Object;
            myHub.Clients = mockClients.Object;
            myHub.Context = mockContext.Object;

            // Add this hub to group
            await myHub.AddToGroup("1");

            // Finally test
            await myHub.SendMessage("test", "1", "wow");

            mockClients.Verify(c => c.All, Times.Once);            
        }     
        [Fact]
        public async void SendingMessageForPollFailTest()
        {
            /*
            Reason why this fails is that we are not creating any groups or the object in database
            */
            var mockRepository = new Mock<IPollRepository>();
            var myHub = new ChatHub(mockRepository.Object);
            
            var mockClients = new Mock<IHubCallerClients>();
            var mockClientProxy = new Mock<IClientProxy>();

            mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Caller).Returns(mockClientProxy.Object);

            myHub.Clients = mockClients.Object;

            await myHub.SendMessage("test", "1", "wow");

            mockClients.Verify(c => c.Caller, Times.Once);            
        }
        public async Task<Poll> getAPollFromList(IQueryable<Poll> pollList)
        {
            return await Task.Run(() => { 
                return pollList.ElementAt(0);
            });
        }
        public async Task<Poll> getAPoll(Poll result)
        {
            return await Task.Run(() => {
                return result;
            });
        }        
        public IQueryable<Result> getAResultList()
        {
            IQueryable<Result> results = new List<Result>
            {
                new Result
                {
                    ResultId = 1,
                    Name = "Good",
                    Votes = 0
                },
                new Result
                {
                    ResultId = 2,
                    Name = "Bad",
                    Votes = 0
                }
            }.AsQueryable();
            return results;
        }           
    }
}
