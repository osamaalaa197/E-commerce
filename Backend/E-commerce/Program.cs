using AppCore;
using AppCore.IRepository;
using AppEF;
using AppEF.Repository;
using AutoMapper;
using E_commerce.Database;
using E_commerce.DTO;
using E_commerce.Mapping;
using E_commerce.models;
using E_commerce.Repo.Product;
using E_commerce.Repo.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<E_commerceDataBase>(options =>
//	options.UseSqlServer(connectionString,
//		b => b.MigrationsAssembly(typeof(E_commerceDataBase).Assembly.FullName)));


builder.Services.AddDbContext<E_commerceDataBase>(options =>
    options.UseSqlServer(connectionString));
#endregion

builder.Services.AddHttpClient();

#region Manager
builder.Services.AddScoped<HttpContextAccessor>();
#endregion

///Microsoft.AspNetCore.Cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        // Allow requests from any origin, method, and header
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<IIslikeRepository, IslikeRepository>();
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();


#region identity
builder.Services.AddIdentity<Users, IdentityRole>()
    .AddEntityFrameworkStores<E_commerceDataBase>();
#endregion

builder.Services.AddSwaggerGen(option =>
{
	option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
	option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		In = ParameterLocation.Header,
		Description = "Please enter a valid token",
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		BearerFormat = "JWT",
		Scheme = "Bearer"
	});
	option.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type=ReferenceType.SecurityScheme,
					Id="Bearer"
				}
			},
			new string[]{}
		}
	});

}
);

#region Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "cool";
    options.DefaultChallengeScheme = "cool";
}).AddJwtBearer("cool", options =>
{
    string keyString = builder.Configuration.GetValue<string>("secretkey")!;
    var keyInByte = Encoding.ASCII.GetBytes(keyString);
    // Convert keyString to security key
    var key = new SymmetricSecurityKey(keyInByte);
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        IssuerSigningKey = key,
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
#endregion


builder.Services.AddAutoMapper(Assembly.GetAssembly(typeof(MappingProfile)));

var app = builder.Build();

//var url = "https://192.168.1.3:8000"; // Set the desired URL here
//app.Urls.Add(url);


// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseRouting(); // This middleware is required for routing.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication(); // Enable authentication before authorization.

app.UseAuthorization();

app.UseCors(); // UseCors should be placed after UseAuthorization.
app.MapControllers();

app.Run();

