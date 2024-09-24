using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Context
{
    public class TestDSSContext : DbContext

    {
        public TestDSSContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet <User>Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .HasKey(x => x.Id);
        }
    }
}
