using DSS.Context;
using DSS.Repository;
using DSS.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connec = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<SGITContex>(options => options.UseSqlServer(connec));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuracio CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin() // Permitir solicitudes desde cualquier origen
                   .AllowAnyMethod()  // Permitir cualquier método (GET, POST, etc.)
                   .AllowAnyHeader(); // Permitir cualquier cabecera
        });
});
//Config 
builder.Services.AddScoped<InRolRepository, RolRepository>();
builder.Services.AddScoped<InRolServices, RolServices>();

builder.Services.AddScoped<InUserRepository, UserRepository>();
builder.Services.AddScoped<InUserServices, UserServices>();

builder.Services.AddScoped<InInfractionRepository, InfractionRepository>();
builder.Services.AddScoped<InInfractionServices, InfractionServices>();

builder.Services.AddScoped<InUserTypeRepository, UserTypeRepository>();
builder.Services.AddScoped<InUserTypeServices, UserTServices>();

builder.Services.AddScoped<InDriverRepository, DriverRepository>();
builder.Services.AddScoped<InDriverServices, DriverServices>();

builder.Services.AddScoped<InVehicleRepository, VehiclesRepository>();
builder.Services.AddScoped<InVehicleServices, VehiclesServices>();


var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

