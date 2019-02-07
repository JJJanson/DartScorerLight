using DartScorerLight.Business.Models;
using Microsoft.EntityFrameworkCore;

namespace DartScorerLight.Business.Repositories.DbContext
{
    public class DartScorerLightContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DartScorerLightContext(DbContextOptions<DartScorerLightContext> options) : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
    }
}