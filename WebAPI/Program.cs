using Microsoft.EntityFrameworkCore;
using Infrastructure;
using Application;
using Domain;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularDev", policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IPedidoRepository, PedidoRepository>();
            builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
            builder.Services.AddScoped<IRegraDescontoPedido, RegraDescontoPedido>();
            builder.Services.AddScoped<IPedidoFacade, PedidoFacade>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("AllowAngularDev");

            app.UseSwagger();
            app.UseSwaggerUI();
            app.MapControllers();
           
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                if (!context.Clientes.Any())
                {
                    context.Clientes.AddRange(
                        new Cliente { Nome = "Fulano (VIP - Desconto Liberado)", Vip = true },
                        new Cliente { Nome = "Sicrano (Não VIP)", Vip = false },
                        new Cliente { Nome = "Beltrano (VIP - Desconto Liberado)", Vip = true }
                    );

                    context.SaveChanges();
                }
            }

            app.Run();
        }
    }
}
