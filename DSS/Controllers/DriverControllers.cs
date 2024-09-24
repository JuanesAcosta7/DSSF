using DSS.Model;
using DSS.Services;
using Microsoft.AspNetCore.Mvc;

namespace DSS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DriverControllers: ControllerBase
    {
        private readonly InDriverServices _DriverService;

        public DriverControllers(InDriverServices DriverService)
        {
            _DriverService = DriverService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Driver>>> GetAllDrivers()
        {
            var Drivers = await _DriverService.GetAllDriversAsync();
            return Ok(Drivers);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Driver>> GetDriversById(int id)
        {
            var subject = await _DriverService.GetDriversByIdAsync(id);
            if (subject == null)
            {
                return NotFound();
            }
            return Ok(subject);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateSubject([FromBody] Driver Driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _DriverService.CreateDriversAsync(Driver);

            return CreatedAtAction(nameof(GetDriversById), new { id = Driver.DriverId }, Driver);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateDrivers(int id, [FromBody] Driver Driver)
        {
            if (id != Driver.DriverId)
            {
                return BadRequest();
            }

            var existingSubject = await _DriverService.GetDriversByIdAsync(id);
            if (existingSubject == null)
            {
                return NotFound();
            }

            await _DriverService.UpdateDriversAsync(Driver);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteDrivers(int id)
        {
            var subject = await _DriverService.GetDriversByIdAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            await _DriverService.DeleteDriversAsync(id);
            return NoContent();
        }
    }
}
