using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace baseService.Models
{
    // Each selection in a Poll needs to be hold at a different row
    public class Result
    {
        public int ResultId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public int Votes { get; set; }

        public int PollId { get; set; }
        public Poll Poll { get; set; }

    }
}