using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace baseService.Models
{
    public class Poll
    {
        public int PollId { get; set; }

        [Required]
        [StringLength(100)]
        public string PollQuestion { get; set; }

        [Required]
        public ICollection<Result> Results { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}