using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace baseService.Models
{
    public class Comment
    {
        public int CommentId { get; set; }

        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        public DateTime PostDate { get; set;}
        
        [Required]
        [StringLength(250)]
        public string Text { get; set; }
        public int PollId { get; set; }
        public Poll Poll { get; set; }
    }    
}