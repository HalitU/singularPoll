using baseService.Models;
using Xunit;
using Microsoft.EntityFrameworkCore;

using Moq;
using System.Collections.Generic;
using System.Linq;
using baseService.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System;
using baseService.Channels;
using System.Threading;

namespace baseService.Tests
{
    public class ModelTest
    {
        [Fact]
        public async void PollModelAddValidTest()
        {

            var randomResults = new Mock<ICollection<Result>>();
            var aPoll = new Poll{
                PollId = 0,
                PollQuestion = "hi",
                Results = randomResults.Object
            };

            var randomPolls = new Mock<IQueryable<Poll>>();

            var mockPolls = new Mock<DbSet<Poll>>();
            var mockResults = new Mock<DbSet<Result>>();
            var mockComments = new Mock<DbSet<Comment>>();

            var mockContext = new Mock<PollContext>();

            var repository = new PollRepository(mockContext.Object);

            ValuesController controller = new ValuesController(repository);
            var result = await controller.Post(aPoll);
        }        
        [Fact]
        public async void PollModelGetValidTest()
        {

            var randomResults = new Mock<ICollection<Result>>();
            var aPoll = new Poll{
                PollId = 0,
                PollQuestion = "hi",
                Results = randomResults.Object
            };

            var randomPolls = new Mock<IQueryable<Poll>>();

            var mockPolls = new Mock<DbSet<Poll>>();
            var mockResults = new Mock<DbSet<Result>>();
            var mockComments = new Mock<DbSet<Comment>>();

            var repository = new Mock<IPollRepository>();
            repository.Setup(m => m.GetPoll(0)).Returns(getAPoll(aPoll));

            ValuesController controller = new ValuesController(repository.Object);
            await controller.Get(0);
            
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
    }
}