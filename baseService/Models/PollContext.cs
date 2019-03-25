using Microsoft.EntityFrameworkCore;
using System;
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


}