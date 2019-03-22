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
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<int>> Get()
        {
            Random r = new Random();    
            return new int[] { r.Next(0, 100), r.Next(0, 100), r.Next(0, 100), r.Next(0, 100), r.Next(0, 100) };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Poll> Get(int id)
        {
            using(var db = new PollContext())
            {
                Poll poll = db.Polls
                                .Include(p => p.Comments)
                                .Include(p => p.Results)
                                .SingleOrDefault(p => p.PollId == id);
                return poll;
            }
        }

        // POST api/values
        [HttpPost]
        public ActionResult<Poll> Post([FromBody] Poll poll)
        {
            using(var db = new PollContext())
            {
                Console.WriteLine("heheheheheh");
                Console.WriteLine(poll.PollQuestion);
                Console.WriteLine(poll.PollId);

                db.Polls.Add(poll);

                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);
            }            
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
