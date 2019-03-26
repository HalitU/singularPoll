using System.Collections.Generic;
using System.Linq;
using System;
using baseService.Models;
using Microsoft.EntityFrameworkCore;

namespace baseService.Models
{
    public class PollRepository: IPollRepository
    {
        private PollContext _context;

        public PollRepository(PollContext context){
            _context = context;
        }
        public Poll AddPoll(Poll poll)
        {
            _context.Polls.Add(poll);
            _context.SaveChanges();
            return poll;
        }

        public Poll GetPoll(int id)
        {
            return _context.Polls
                            .Include(p => p.Comments)
                            .Include(p => p.Results)
                            .SingleOrDefault(p => p.PollId == id);
        }

    }
}