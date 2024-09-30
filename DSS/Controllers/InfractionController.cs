using DSS.Model;
using DSS.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class InfractionControllers : ControllerBase
{
    private readonly InInfractionServices _infractionService;

    public InfractionControllers(InInfractionServices infractionService)
    {
        _infractionService = infractionService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Infracction>>> GetAllInfraction()
    {
        var infracctions = await _infractionService.GetAllInfractionAsync();
        return Ok(infracctions);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Infracction>> GetInfractionById(int id)
    {
        var infractions = await _infractionService.GetInfractionByIdAsync(id);
        if (infractions == null)
        {
            return NotFound();
        }
        return Ok(infractions);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateInfraction([FromBody] Infracction infracction)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _infractionService.CreateInfractionAsync(infracction);

        return CreatedAtAction(nameof(GetInfractionById), new { id = infracction.InfracctionId }, infracction);
    }
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateInfraction(int id, [FromBody] Infracction infracction)
    {
        if (id != infracction.InfracctionId)
        {
            return BadRequest();
        }

        var infraction = await _infractionService.GetInfractionByIdAsync(id);
        if (infracction == null)
        {
            return NotFound();
        }

        await _infractionService.UpdateInfractionAsync(infracction);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteInfraction(int id)
    {
        var infraction = await _infractionService.GetInfractionByIdAsync(id);
        if (infraction == null)
        {
            return NotFound();
        }

        await _infractionService.DeleteInfractionAsync(id);
        return NoContent();
    }
}

