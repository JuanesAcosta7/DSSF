using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Context
{
    public class SGITContex : DbContext
    {
        public SGITContex(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<User> users { get; set; }
        public DbSet<Rol> Rols { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .HasKey(u => u.UserId);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Rol>()
                .HasKey(u => u.RolId);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserType>()
                .HasKey(u => u.UserTypeId);

           // modelBuilder.Entity<UserType>()
             //   .HasOne(u => u.User)
               // .WithMany(ut => ut.U);


        }

    }
}
