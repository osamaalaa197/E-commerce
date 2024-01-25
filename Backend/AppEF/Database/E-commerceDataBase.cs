using AppCore.models;
using E_commerce.Controllers.Cart;
using E_commerce.models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Database
{
    public class E_commerceDataBase: IdentityDbContext<Users>
    {
        public DbSet<Products> Products { get; set; }
        public DbSet<Users> User { get; set; }
        public DbSet<IsFavourite> IsFavourite { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Cartitem> Cartitems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public E_commerceDataBase(DbContextOptions<E_commerceDataBase> options):base(options)
        {

        }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    modelBuilder.Entity<CartShopping>()
        //        .HasKey(c => c.Id);

        //    modelBuilder.Entity<CartItem>()
        //        .HasKey(ci => ci.Id);

        //    // Define the relationship between Cart and CartItem
        //    modelBuilder.Entity<CartItem>()
        //        .HasOne(ci => ci.Cart)
        //        .WithMany(c => c.CartItems)
        //        .HasForeignKey(ci => ci.CartId);
        //}

    }
}
