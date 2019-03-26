using System;
using System.Collections.Generic;

namespace baseService.Models
{
    public interface IPollRepository
    {
        Poll AddPoll(Poll poll);
        Poll GetPoll(int id);
    }
}