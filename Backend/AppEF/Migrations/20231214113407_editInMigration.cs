using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppEF.Migrations
{
    /// <inheritdoc />
    public partial class editInMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cartitem_AspNetUsers_UsersId",
                table: "Cartitem");

            migrationBuilder.DropTable(
                name: "CartProducts");

            migrationBuilder.DropTable(
                name: "IsLikeProducts");

            migrationBuilder.DropTable(
                name: "isLikes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cartitem",
                table: "Cartitem");

            migrationBuilder.RenameTable(
                name: "Cartitem",
                newName: "Cart");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Products",
                newName: "Name");

            migrationBuilder.RenameIndex(
                name: "IX_Cartitem_UsersId",
                table: "Cart",
                newName: "IX_Cart_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Cartitems",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    ProductsId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cartitems", x => x.id);
                    table.ForeignKey(
                        name: "FK_Cartitems_Cart_CartId",
                        column: x => x.CartId,
                        principalTable: "Cart",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cartitems_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "IsFavourite",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProductsId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IsFavourite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IsFavourite_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_IsFavourite_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    RestaurantId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_Restaurants_RestaurantId",
                        column: x => x.RestaurantId,
                        principalTable: "Restaurants",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RestaurantProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProducstId = table.Column<int>(type: "int", nullable: false),
                    ProductsId = table.Column<int>(type: "int", nullable: false),
                    RestaurantId = table.Column<int>(type: "int", nullable: false),
                    Availabliity = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RestaurantProducts_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RestaurantProducts_Restaurants_RestaurantId",
                        column: x => x.RestaurantId,
                        principalTable: "Restaurants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: true),
                    ProductsId = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cartitems_CartId",
                table: "Cartitems",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_Cartitems_ProductsId",
                table: "Cartitems",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_IsFavourite_ProductsId",
                table: "IsFavourite",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_IsFavourite_UsersId",
                table: "IsFavourite",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductsId",
                table: "OrderItems",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_RestaurantId",
                table: "Orders",
                column: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UsersId",
                table: "Orders",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantProducts_ProductsId",
                table: "RestaurantProducts",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantProducts_RestaurantId",
                table: "RestaurantProducts",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_AspNetUsers_UsersId",
                table: "Cart",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_AspNetUsers_UsersId",
                table: "Cart");

            migrationBuilder.DropTable(
                name: "Cartitems");

            migrationBuilder.DropTable(
                name: "IsFavourite");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "RestaurantProducts");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Restaurants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "Cartitem");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Products",
                newName: "Title");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_UsersId",
                table: "Cartitem",
                newName: "IX_Cartitem_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cartitem",
                table: "Cartitem",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CartProducts",
                columns: table => new
                {
                    CartitemId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartProducts", x => new { x.CartitemId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_CartProducts_Cartitem_CartitemId",
                        column: x => x.CartitemId,
                        principalTable: "Cartitem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "isLikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_isLikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_isLikes_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "IsLikeProducts",
                columns: table => new
                {
                    IslikeId = table.Column<int>(type: "int", nullable: false),
                    ProductsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IsLikeProducts", x => new { x.IslikeId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_IsLikeProducts_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IsLikeProducts_isLikes_IslikeId",
                        column: x => x.IslikeId,
                        principalTable: "isLikes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartProducts_ProductId",
                table: "CartProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_IsLikeProducts_ProductsId",
                table: "IsLikeProducts",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_isLikes_UsersId",
                table: "isLikes",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cartitem_AspNetUsers_UsersId",
                table: "Cartitem",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
