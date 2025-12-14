using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain;

namespace Infrastructure
{
    public class PedidoMap : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            builder.ToTable("pedido");

            builder.Property(p => p.Id).HasColumnName("id");
            builder.Property(p => p.Valor).HasColumnName("valor");
            builder.Property(p => p.Desconto).HasColumnName("desconto");
            builder.Property(p => p.Aprovado).HasColumnName("aprovado");
            builder.Property(p => p.ClienteId).HasColumnName("cliente_id");
        }
    }
}
