using MemberPlus.Common;
using MemberPlus.Common.Filters;
using MemberPlus.Common.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<AccountsService>();
builder.Services.AddSingleton<AuthorizationService>();
builder.Services.AddSingleton<ContactsService>();
builder.Services.AddSingleton<ISQLConnectionFactory, LocalhostSQLConnectionFactory>();
builder.Services.AddSingleton<MembershipLevelsService>();
builder.Services.AddSingleton<TenantsService>();
builder.Services.AddExceptionHandler<EntityNotFoundExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = "https://dev-ywc4ezu2upingb1g.us.auth0.com/";
    options.Audience = "https://localhost:7179/";
});

var app = builder.Build();

app.UseExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
