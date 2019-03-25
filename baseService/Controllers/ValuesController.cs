using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using baseService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace baseService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly PollContext pollContext;
        public ValuesController(PollContext pC){
            pollContext = pC;
        }
        // GET api/values
        [HttpGet]
        public void Get()
        {
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Poll> Get(int id)
        {
            Poll poll = pollContext.Polls
                            .Include(p => p.Comments)
                            .Include(p => p.Results)
                            .SingleOrDefault(p => p.PollId == id);
            return poll;
        }

        // POST api/values
        [HttpPost]
        public ActionResult<Poll> Post([FromBody] Poll poll)
        {

            pollContext.Polls.Add(poll);
            var count = pollContext.SaveChanges();
            Console.WriteLine("{0} records saved to database", count);
            return poll;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
