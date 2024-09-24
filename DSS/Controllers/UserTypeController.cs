using DSS.Model;
using DSS.Service;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserTypeController
{
    private readonly InUserTypeService _usertypeService;

    public UserTypeController(InUserTypeService usertypeService)
    {
        _usertypeService = usertypeService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UserType>>> GetAllUserType()
    {
        var usertypes = await _usertypeService.GetAllUserTypeAsync();
        return Ok(usertypes);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserType>> GetUserTypeByUserTypeId(int id)
    {
        var usertype = await _usertypeService.GetUserTypeByUserTypeIdAsync(id);
        if (usertype == null)
            return NotFound();

        return Ok(user);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> CreateUserType([FromBody] UserType usertype)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _usertypeService.CreateUserTypeAsync(usertype);
        return CreatedAtAction(nameof(GetUserTypeByUserTypeId), new { id = usertype.UserTypeId }, usertype);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUserType(int id, [FromBody] UserType usertype)
    {
        if (id != usertype.UserTypeId)
            return BadRequest();
        var existingUser = await _usertypeService.GetUserTypeByUserTypeIdAsync(id);
        if (existingUser == null)
            return NotFound();

        await _usertypeService.UpdateUserTypeAsync(usertype);
        return NoContent();

    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SoftDeletedUserType(int id)
    {
        var usertype = await _usertypeService.GetUserTypeByUserTypeIdAsync(id);
        if (usertype == null)
            return NotFound();
        await _usertypeService.SoftDeleteUserTypeAsync(id);
        return NoContent();
    }
}