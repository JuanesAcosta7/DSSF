using DSS.Model;
using DSS.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserTypeControllers : ControllerBase
{
    private readonly InUserTypeServices _userTypeService;

    public UserTypeControllers(InUserTypeServices usertypeService)
    {
        _userTypeService = usertypeService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
    {
        var usersT = await _userTypeService.GetAllUserTAsync();
        return Ok(usersT);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserType>> GetUserTypeById(int id)
    {
        var usert = await _userTypeService.GetUserTByIdAsync(id);
        if (usert == null)
        {
            return NotFound();
        }
        return Ok(usert);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateUserType([FromBody] UserType userType)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _userTypeService.CreateUserTAsync(userType);

        return CreatedAtAction(nameof(GetUserTypeById), new { id = userType.UserTypeId }, userType);
    }
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUserType(int id, [FromBody] UserType usert)
    {
        if (id != usert.UserTypeId)
        {
            return BadRequest();
        }

        var userT = await _userTypeService.GetUserTByIdAsync(id);
        if (usert == null)
        {
            return NotFound();
        }

        await _userTypeService.UpdateUserTAsync(usert);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteType(int id)
    {
        var userT = await _userTypeService.GetUserTByIdAsync(id);
        if (userT == null)
        {
            return NotFound();
        }

        await _userTypeService.DeleteUserTAsync(id);
        return NoContent();
    }
}
