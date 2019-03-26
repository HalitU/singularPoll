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
        private readonly IPollRepository _repository;
        public ValuesController(IPollRepository repository){
            _repository = repository;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Poll>> Get(int id)
        {
            Poll result = await _repository.GetPoll(id);
            if(result != null)
            {
                return result;
            }else{
                return StatusCode(404, "A poll with that id doesnt exist.");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Poll>> Post([FromBody] Poll poll)
        {
            return await _repository.AddPoll(poll);
        }
    }
}
