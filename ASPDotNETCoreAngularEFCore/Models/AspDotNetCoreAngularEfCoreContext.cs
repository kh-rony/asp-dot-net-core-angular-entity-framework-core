using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace ASPDotNETCoreAngularEFCore.Models
{
    public partial class AspDotNetCoreAngularEfCoreContext : DbContext
    {
        public AspDotNetCoreAngularEfCoreContext()
        {
        }

        public AspDotNetCoreAngularEfCoreContext(DbContextOptions<AspDotNetCoreAngularEfCoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Building> Buildings { get; set; }
        public virtual DbSet<Object> Objects { get; set; }
        public virtual DbSet<Reading> Readings { get; set; }
        public virtual DbSet<Test> Tests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if( optionsBuilder.IsConfigured ) return;
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DatabaseConnectionString"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Building>(entity =>
            {
                entity.ToTable("Building");

                entity.Property(e => e.Location)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Object>(entity =>
            {
                entity.ToTable("Object");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Building)
                    .WithMany(p => p.Objects)
                    .HasForeignKey(d => d.BuildingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Object__Building__29572725");
            });

            modelBuilder.Entity<Reading>(entity =>
            {
                entity.ToTable("Reading");

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Building)
                    .WithMany(p => p.Readings)
                    .HasForeignKey(d => d.BuildingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reading__Buildin__2C3393D0");

                entity.HasOne(d => d.Object)
                    .WithMany(p => p.Readings)
                    .HasForeignKey(d => d.ObjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reading__ObjectI__2D27B809");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("Test");

                entity.Property(e => e.Location)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}