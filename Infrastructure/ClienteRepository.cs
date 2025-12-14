using Microsoft.EntityFrameworkCore;
using Domain;
using Application;

namespace Infrastructure
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly AppDbContext _context;

        public ClienteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Cliente>> GetAllAsync() =>
            await _context.Clientes.ToListAsync();

        public async Task<Cliente?> GetByIdAsync(int id) =>
            await _context.Clientes
                .FirstOrDefaultAsync(c => c.Id == id);

        public async Task<Cliente> AddAsync(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task<Cliente> UpdateAsync(Cliente cliente)
        {
            _context.Clientes.Update(cliente);
            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task DeleteAsync(int id)
        {
            var cliente = await GetByIdAsync(id);

            if (cliente == null) return;

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
        }
    }
}
