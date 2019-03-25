using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace baseService.Models
{
    // Each selection in a Poll needs to be hold at a different row
    public class Result
    {
        public int ResultId { get; set; }
        public string Name { get; set; }
        public int Votes { get; set; }

        public int PollId { get; set; }
        public Poll Poll { get; set; }

    }
}