using Domain;

namespace Application
{
    public class PedidoFacade : IPedidoFacade
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly IClienteRepository _clienteRepository;
        private readonly IRegraDescontoPedido _regraDescontoPedido;

        public PedidoFacade(
                IClienteRepository clienteRepository, 
                IPedidoRepository pedidoRepository,
                IRegraDescontoPedido regraDescontoPedido
            )
        {
            _clienteRepository = clienteRepository;
            _pedidoRepository = pedidoRepository;
            _regraDescontoPedido = regraDescontoPedido;
        }

        public async Task<IEnumerable<Pedido>> GetAllPedidosAsync()
        {
            return await _pedidoRepository.GetAllAsync();
        }

        public async Task<Pedido?> GetPedidoByIdAsync(int id)
        {
            return await _pedidoRepository.GetByIdAsync(id);
        }

        public async Task<Result> CreatePedidoAsync(Pedido pedido)
        {
            var validationError = await AplicarDescontoAsync(pedido);

            if (!validationError.Success)
            {
                return validationError;
            }

            await _pedidoRepository.AddAsync(pedido);
            return Result.Ok();
        }

        public async Task<Result> UpdatePedidoAsync(Pedido pedido)
        {
            var validationError = await AplicarDescontoAsync(pedido);

            if (!validationError.Success)
            {
                return validationError;
            }

            await _pedidoRepository.UpdateAsync(pedido);
            return Result.Ok();
        }

        public async Task DeletePedidoAsync(int id)
        {
            await _pedidoRepository.DeleteAsync(id);
        }

        private async Task<Result> AplicarDescontoAsync(Pedido pedido)
        {
            var cliente = await _clienteRepository.GetByIdAsync(pedido.ClienteId);

            if (cliente == null)
                return Result.Fail("Cliente não encontrado.");

            return _regraDescontoPedido.AplicarDesconto(pedido, cliente);
        }
    }
}
