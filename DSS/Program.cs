using DSS.Context;
using DSS.Interfaces;
using DSS.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connec = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<SGITContex>(options => options.UseSqlServer(connec));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
//Config rol
builder.Services.AddScoped<InRolRespository, RolRepository>();
builder.Services.AddScoped<InRolService, RolService>();

builder.Services.AddScoped<InUserRespository, UserRepository>();
builder.Services.AddScoped<InUserService, UserService>();

builder.Services.AddScoped<InInfractionRepository, InfractionRepository>();
builder.Services.AddScoped<InInfractionService, InfractionService>();

builder.Services.AddScoped<InUserTypeRespository, UserTypeRepository>();
builder.Services.AddScoped<InUserTypeService, UserTypeService>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

