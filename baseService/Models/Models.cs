using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace baseService.Models
{
    public class PollContext: DbContext
    {
        public DbSet<Poll> Polls { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=polling.db");
        }        
    }
    public class Poll
    {
        public int PollId { get; set; }
        public string PollQuestion { get; set; }

        public ICollection<Result> Results { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
    // Each selection in a Poll needs to be hold at a different row
    public class Result
    {
        public int ResultId { get; set; }
        public string Name { get; set; }
        public int Votes { get; set; }

        public int PollId { get; set; }
        public Poll Poll { get; set; }

    }
    public class Comment
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public int PollId { get; set; }
        public Poll Poll { get; set; }
    }
}