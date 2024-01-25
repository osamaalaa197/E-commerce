using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppEF.Migrations
{
    /// <inheritdoc />
    public partial class editInProductRestaurantTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cartitems_Products_ProductsId",
                table: "Cartitems");

            migrationBuilder.DropColumn(
                name: "ProducstId",
                table: "RestaurantProducts");

            migrationBuilder.AlterColumn<int>(
                name: "ProductsId",
                table: "Cartitems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cartitems_Products_ProductsId",
                table: "Cartitems",
                column: "ProductsId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cartitems_Products_ProductsId",
                table: "Cartitems");

            migrationBuilder.AddColumn<int>(
                name: "ProducstId",
                table: "RestaurantProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ProductsId",
                table: "Cartitems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Cartitems_Products_ProductsId",
                table: "Cartitems",
                column: "ProductsId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
