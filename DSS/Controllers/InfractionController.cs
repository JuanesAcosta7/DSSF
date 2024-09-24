using DSS.Model;
using DSS.Service;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class InfractionController
{
    private readonly InInfractionService _infractionService;

    public InfractionController(InInfractionService infractionService)
    {
        _infractionService = infractionService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Infracction>>> GetAllInfraction()
    {
        var infractions = await _infractionService.GetAllInfractionAsync();
        return Ok(infractions);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Infracction>> GetInfractionByInfractionId(int id)
    {
        var Infraction = await _infractionService.GetInfractionByInfractionIdAsync(id);
        if (Infraction == null)
            return NotFound();

        return Ok(Infraction);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> CreateInfraction([FromBody] Infracction infracction)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _infractionService.CreateInfractionAsync(infracction);
        return CreatedAtAction(nameof(GetInfractionByInfractionId), new { id = infracction.InfracctionId }, infracction);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateInfraction(int id, [FromBody] Infracction infracction)
    {
        if (id != infracction.InfracctionId)
            return BadRequest();
        var existingInfraction = await _infractionService.GetInfractionByInfractionIdAsync(id);
        if (existingInfraction == null)
            return NotFound();

        await _infractionService.UpdateInfractionAsync(infracction);
        return NoContent();

    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SoftDeletedInfraction(int id)
    {
        var infraction = await _infractionService.SoftDeleteInfractionAsync(id);
        if (infraction == null)
            return NotFound();
        await _infractionService.SoftDeleteInfractionAsync(id);
        return NoContent();
    }
}

