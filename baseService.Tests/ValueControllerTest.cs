using baseService.Models;
using Xunit;
using Microsoft.EntityFrameworkCore;

using Moq;
using System.Collections.Generic;
using System.Linq;
using baseService.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace baseService.Tests
{
    public class ValuesControllerTest
    {
        [Fact]
        public void GetPollTest()
        {
            // Mock objects
            IQueryable<Result> results = getAResultList();

            IQueryable<Poll> polls = new List<Poll>
            {
                new Poll
                {
                    PollQuestion = "Whats up?",
                    Results = results.ToList()
                }
            }.AsQueryable();

            var mockRepository = new Mock<IPollRepository>();
            mockRepository.Setup(m => m.GetPoll(1)).Returns(polls.ElementAt(0));

            ValuesController controller = new ValuesController(mockRepository.Object);

            var actual = controller.Get(1);

            Assert.Equal("Whats up?", actual.Value.PollQuestion);
        }
        
        [Fact]
        public void AddPollTest()
        {
            Poll obj = new Poll();
            obj.PollQuestion = "Whats up?";
            obj.Results = getAResultList().ToList();

            var mockRepository = new Mock<IPollRepository>();
            mockRepository.Setup(p => p.AddPoll(obj)).Returns(obj);
            
            ValuesController controller = new ValuesController(mockRepository.Object);

            ActionResult<Poll> result = controller.Post(obj);
            Assert.Equal("Whats up?", result.Value.PollQuestion);
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