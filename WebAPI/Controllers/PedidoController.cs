using Microsoft.AspNetCore.Mvc;
using Application;
using Domain;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidoController : ControllerBase
{
    private readonly IPedidoFacade _facade;
    public PedidoController(IPedidoFacade facade)
    {
        _facade = facade;
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _facade.GetAllPedidosAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var pedido = await _facade.GetPedidoByIdAsync(id);
        if (pedido == null) return NotFound();
        return Ok(pedido);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Pedido pedido)
    {
        try
        {
            var result = await _facade.CreatePedidoAsync(pedido);
            return CreatedAtAction(nameof(Get), new { sucess = result.Success,  erroMessage = result.Error }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Pedido pedido)
    {
        if (id != pedido.Id) return BadRequest("ID inválido.");
        try
        {
            var result = await _facade.UpdatePedidoAsync(pedido);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _facade.DeletePedidoAsync(id);
        return NoContent();
    }
}