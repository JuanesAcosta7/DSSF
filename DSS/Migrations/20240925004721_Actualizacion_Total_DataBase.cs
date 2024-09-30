using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DSS.Migrations
{
    /// <inheritdoc />
    public partial class Actualizacion_Total_DataBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDelete",
                table: "Drivers",
                newName: "IsDeleted");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Drivers",
                newName: "IsDelete");
        }
    }
}
