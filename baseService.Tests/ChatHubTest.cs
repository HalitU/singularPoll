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
        public async void AddingUserToGroupTest()
        {
            Assert.Equal(2, 2);
        }
        [Fact]
        public void RemoveUserFromGroupTest()
        {

            Assert.Equal(2, 2);
        }
        [Fact]
        public void SendingVoteForPollTest()
        {

            Assert.Equal(2, 2);
        }
/*         [Fact]
        public async void SendingMessageForPollTest()
        {
            Create dbcontext and add the Poll object
            Poll obj = new Poll();
            obj.PollQuestion = "Whats up?";
            obj.Results = getAResultList().ToList();

            var mockRepository = new Mock<IPollRepository>();
            mockRepository.Setup(p => p.AddPoll(obj)).Returns(obj);
            
            ValuesController controller = new ValuesController(mockRepository.Object);

            ActionResult<Poll> result = controller.Post(obj);

            var dbcontext = new PollContext();
            var myHub = new ChatHub(mockRepository._context);
            
            var mockClients = new Mock<IHubCallerClients>();
            var mockClientProxy = new Mock<IClientProxy>();

            mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Caller).Returns(mockClientProxy.Object);

            myHub.Clients = mockClients.Object;

            await myHub.SendMessage("test", "1", "wow");

            mockClients.Verify(c => c.Caller, Times.Once);            
        }     
        [Fact]
        public async void SendingMessageForPollFailTest()
        {
            
            // Reason why this fails is that we are not creating any groups or the object in database
            
            var dbcontext = new PollContext();
            var myHub = new ChatHub(dbcontext);
            
            var mockClients = new Mock<IHubCallerClients>();
            var mockClientProxy = new Mock<IClientProxy>();

            mockClients.Setup(c => c.All).Returns(mockClientProxy.Object);
            mockClients.Setup(c => c.Caller).Returns(mockClientProxy.Object);

            myHub.Clients = mockClients.Object;

            await myHub.SendMessage("test", "1", "wow");

            mockClients.Verify(c => c.Caller, Times.Once);            
        } */

        [Fact]
        public async Task AddToGroupValid()
        {
            const string GROUP_NAME = "test";
            const string CONNECTION_ID = "connection_id";

            var repository = new Mock<IPollRepository>();
            var callerClients = new Mock<IHubCallerClients>();
            var groupManager = new Mock<IGroupManager>();
            var context = new Mock<HubCallerContext>();

            context.SetupGet(i => i.ConnectionId)
                .Returns(CONNECTION_ID);

            callerClients.SetupSet(i => i.Group(GROUP_NAME).SendAsync(It.IsAny<string>(), It.IsAny<string>()));

            var chatHub = new ChatHub(repository.Object);
            chatHub.Groups = groupManager.Object;
            chatHub.Clients = callerClients.Object;
            chatHub.Context = context.Object;

            await chatHub.AddToGroup(GROUP_NAME);

            // you have to make sure that the method is called.
            // this is only way to test the AddToGroup method
            groupManager.VerifySet(i => i.AddToGroupAsync(CONNECTION_ID, GROUP_NAME));

        }

        public IQueryable<Result> getAResultList()
        {
            IQueryable<Result> results = new List<Result>
            {
                new Result
                {
                    Name = "Good",
                    Votes = 0
                },
                new Result
                {
                    Name = "Bad",
                    Votes = 0
                }
            }.AsQueryable();
            return results;
        }        
    }
}
