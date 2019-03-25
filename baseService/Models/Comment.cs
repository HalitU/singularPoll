using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace baseService.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string UserName { get; set; }
        public DateTime PostDate { get; set;}
        public string Text { get; set; }
        public int PollId { get; set; }
        public Poll Poll { get; set; }
    }    
}