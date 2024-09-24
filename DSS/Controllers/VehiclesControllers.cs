using DSS.Model;
using DSS.Services;
using Microsoft.AspNetCore.Mvc;

namespace DSS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleControllers : ControllerBase
    {
        private readonly InVehicleServices _VehicleService;

        public VehicleControllers(InVehicleServices VehicleService)
        {
            _VehicleService = VehicleService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Driver>>> GetAllDrivers()
        {
            var Vehicle = await _VehicleService.GetAllVehiclesAsync();
            return Ok(Vehicle);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Vehicles>> GetVehicleById(int id)
        {
            var Vehicle = await _VehicleService.GetVehicleByIdAsync(id);
            if (Vehicle == null)
            {
                return NotFound();
            }
            return Ok(Vehicle);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateVehicle([FromBody] Vehicles Vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _VehicleService.CreateVehicleAsync(Vehicle);

            return CreatedAtAction(nameof(GetVehicleById), new { id = Vehicle.VehicleId }, Vehicle);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] Vehicles Vehicle)
        {
            if (id != Vehicle.VehicleId)
            {
                return BadRequest();
            }

            var sVehicle = await _VehicleService.GetVehicleByIdAsync(id);
            if (sVehicle == null)
            {
                return NotFound();
            }

            await _VehicleService.UpdateVehicleAsync(Vehicle);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var Vehicle = await _VehicleService.GetVehicleByIdAsync(id);
            if (Vehicle == null)
            {
                return NotFound();
            }

            await _VehicleService.DeleteVehicleAsync(id);
            return NoContent();
        }
    }
}