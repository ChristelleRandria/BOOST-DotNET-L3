using Microsoft.EntityFrameworkCore;
using crudap.Models;

namespace crudap.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks { get; set; }
}
