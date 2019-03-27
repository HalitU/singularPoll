using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace baseService.Models
{
    public interface IPollRepository
    {
        Task<Poll> AddPoll(Poll poll);
        Task<Poll> GetPoll(int id);
        Task<Result> GetResult(int poll_id, int vote_id);
        Task AddComment(string authorName, string message, int pollId);
        Task IncrementVote(int result_id, int poll_id);
        Task<int> SaveChanges();
    }
}