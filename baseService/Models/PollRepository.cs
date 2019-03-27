using System.Collections.Generic;
using System.Linq;
using System;
using baseService.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace baseService.Models
{
    public class PollRepository: IPollRepository
    {
        private PollContext _context;

        public PollRepository(PollContext context){
            _context = context;
        }
        public async Task<Poll> AddPoll(Poll poll)
        {
            await _context.Polls.AddAsync(poll);
            await _context.Save();
            return poll;
        }
        public async Task<Poll> GetPoll(int id)
        {
            return await _context.Polls
                            .Include(p => p.Comments)
                            .Include(p => p.Results)
                            .SingleOrDefaultAsync(p => p.PollId == id);
        }
        public async Task<Result> GetResult(int poll_id, int vote_id)
        {
            return await _context.Results.Include(p => p.Poll).SingleOrDefaultAsync(p => p.PollId == poll_id && p.ResultId == vote_id);
        }
        public async Task AddComment(string authorName, string message, int pollId)
        {
            Poll currentPoll = await GetPoll(pollId);

            Comment sentComment = new Comment();
            sentComment.UserName = authorName;
            sentComment.PostDate = DateTime.Now;
            sentComment.Text = message;
            sentComment.Poll = currentPoll;
            sentComment.PollId = currentPoll.PollId;

            await _context.Comments.AddAsync(sentComment);
            await _context.Save();
        }
        public async Task IncrementVote(int resultId, int pollId)
        {
            var result = await _context.Results.SingleOrDefaultAsync(p => p.PollId == pollId && p.ResultId == resultId);
            result.Votes++;
            await _context.Save();
        }
        public async Task<int> SaveChanges()
        {
            return await _context.Save();
        }
    }
}