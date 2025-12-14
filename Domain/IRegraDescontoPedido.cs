namespace Domain
{
    public interface IRegraDescontoPedido
    {
        Result AplicarDesconto(Pedido pedido, Cliente cliente);
    }
}