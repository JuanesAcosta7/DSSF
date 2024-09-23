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
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Vehicles> Vehicles { get; set; }
        public DbSet<Infracction> infracctions { get; set; }
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

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Driver>()
                .HasKey(u => u.DriverId);

           base.OnModelCreating(modelBuilder);
           modelBuilder.Entity<Vehicles>()
                .HasKey(u => u.VehicleId);

           base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Infracction>()
                .HasKey(u => u.InfracctionId);
        }

    }
}
