using DSS.Model;
using DSS.Service;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RolController
{
    private readonly InRolService _rolService;

    public RolController(InRolService rolService)
    {
        _rolService = rolService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Rol>>> GetAllRol()
    {
        var rol = await _rolService.GetAllRolAsync();
        return Ok(rol);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Rol>> GetRolByRolId(int id)
    {
        var rol = await _rolService.GetRolByRolIdAsync(id);
        if (rol == null)
            return NotFound();

        return Ok(rol);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> CreateRol([FromBody] Rol rol)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _rolService.CreateRolAsync(rol);
        return CreatedAtAction(nameof(GetRolByRolId), new { id = rol.RolId }, rol);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateRol(int id, [FromBody] Rol rol)
    {
        if (id != rol.RolId)
            return BadRequest();
        var existingUser = await _rolService.GetRolByRolIdAsync(id);
        if (existingUser == null)
            return NotFound();

        await _rolService.UpdateRolAsync(rol);
        return NoContent();

    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SoftDeletedRol(int id)
    {
        var rol = await _rolService.GetRolByRolIdAsync(id);
        if (rol == null)
            return NotFound();
        await _rolService.SoftDeleteRolAsync(id);
        return NoContent();
    }
}