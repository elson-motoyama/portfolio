namespace Domain
{
    public class RegraDescontoPedido : IRegraDescontoPedido
    {
        public Result AplicarDesconto(Pedido pedido, Cliente cliente)
        {
            if (pedido.Aprovado)
            {
                return Result.Fail("O pedido não pode ser modificado pois já está aprovado.");
            }

            if (pedido.Desconto == 0)
            {
                return Result.Ok();
            }

            if (cliente == null || !cliente.Vip)
            {
                return Result.Fail("Desconto negado. Apenas clientes VIP podem solicitar desconto.");
            }

            decimal maxDesconto = pedido.Valor switch
            {
                <= 500 => 5, 
                > 500 => 10, 
            };

            if (pedido.Desconto > maxDesconto)
            {
                return Result.Fail($"Desconto negado. O desconto máximo permitido para um pedido de R$ {pedido.Valor:N2} é de {maxDesconto}%.");
            }

            return Result.Ok();
        }
    }
}
