using Domain;

namespace Application
{
    public interface IPedidoFacade
    {
        Task<IEnumerable<Pedido>> GetAllPedidosAsync();

        Task<Pedido?> GetPedidoByIdAsync(int id);

        Task<Result> CreatePedidoAsync(Pedido pedido);

        Task<Result> UpdatePedidoAsync(Pedido pedido);

        Task DeletePedidoAsync(int id);       
    }
}
