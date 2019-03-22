using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using baseService.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace baseService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
            /*
                An example poll creation with context and comments
            */
            using (var db = new PollContext())
            {
                /*
                    Resetting objects before appending any since this is for illustration purposes...
                */
                foreach(Comment c in db.Comments)
                {
                    db.Comments.Remove(c);
                }
                foreach(Result c in db.Results)
                {
                    db.Results.Remove(c);
                }
                foreach(Poll c in db.Polls)
                {
                    db.Polls.Remove(c);
                }
                /*
                    Create new poll and its comments and results
                */
                Poll poll = new Poll();
                poll.PollQuestion = "How is it going?";
                poll.PollId = 5;

                Result good = new Result();
                good.Name = "Good";
                good.Votes = 10;
                good.PollId = poll.PollId;

                Result bad = new Result();
                bad.Name = "bad";
                bad.Votes = 5;
                bad.PollId = poll.PollId;
                bad.Poll = poll;
                
                Comment com1 = new Comment();
                com1.Text = "Nice app!";
                com1.PollId = poll.PollId;
                com1.Poll = poll;

                Comment com2 = new Comment();
                com2.Text = "You think so?";
                com2.PollId = poll.PollId;
                com2.Poll = poll;

                db.Polls.Add(poll);
                db.Results.Add(good);
                db.Results.Add(bad);
                db.Comments.Add(com1);
                db.Comments.Add(com2);

                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);

                Console.WriteLine();
                Console.WriteLine("All polls in database:");
                foreach (var result in db.Polls)
                {
                    Console.WriteLine(" - {0}", result.PollQuestion);
                    foreach (var comm in result.Comments)
                    {
                        Console.WriteLine(" - {0}", comm.Text);
                    }
                }
            }            
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
