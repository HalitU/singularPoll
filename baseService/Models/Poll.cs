using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace baseService.Models
{
    public class Poll
    {
        public int PollId { get; set; }
        public string PollQuestion { get; set; }

        public ICollection<Result> Results { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}