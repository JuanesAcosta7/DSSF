using DSS.Model;
using DSS.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RolControllers : ControllerBase
{
    private readonly InRolServices _rolService;

    public RolControllers(InRolServices rolService)
    {
        _rolService = rolService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Rol>>> GetAllRol()
    {
        var rols = await _rolService.GetAllRolAsync();
        return Ok(rols);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Rol>> GetRolById(int id)
    {
        var rols = await _rolService.GetRolByIdAsync(id);
        if (rols == null)
        {
            return NotFound();
        }
        return Ok(rols);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateRol([FromBody] Rol rol)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _rolService.CreateRolAsync(rol);

        return CreatedAtAction(nameof(GetRolById), new { id = rol.RolId }, rol);
    }
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateRol(int id, [FromBody] Rol rol)
    {
        if (id != rol.RolId)
        {
            return BadRequest();
        }

        var rols = await _rolService.GetRolByIdAsync(id);
        if (rols == null)
        {
            return NotFound();
        }

        await _rolService.UpdateRolAsync(rol);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteRol(int id)
    {
        var rol = await _rolService.GetRolByIdAsync(id);
        if (rol == null)
        {
            return NotFound();
        }

        await _rolService.DeleteRolAsync(id);
        return NoContent();
    }
}

