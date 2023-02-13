using System.Globalization;
using API.Data;
using API.Intrfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationExtensions
    {
        public static IServiceCollection AddApplicationServices (this IServiceCollection service , IConfiguration config)
        {
            service.AddCors();
            service.AddScoped<ITokenService , TokenService>();

            service.AddDbContext<DataContext>( opt => 
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return service ;
        }
    }
}