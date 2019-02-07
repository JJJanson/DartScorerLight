using System;
using System.Collections.Generic;

namespace DartScorerLight.Business.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tag { get; set; }
        public DateTime CreateDateUtc { get; set; }
        public DateTime ChangeDateUtc { get; set; }

        public ICollection<Game> Games { get; set; }
    }
}