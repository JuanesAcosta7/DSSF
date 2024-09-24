using DSS.Model;
using DSS.Service;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
    public class UserController
    {
        private readonly InUserService _userService;
        
        public UserController(InUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]   
    public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
    {
        var users = await _userService.GetAllUserAsync();
        return Ok(users);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<User>> GetUserByUserId(int id)
    {
        var user = await _userService.GetUserByUserIdAsync(id);
        if (user == null)
            return NotFound();

        return Ok(user);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> CreateUser([FromBody] User user)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _userService.CreateUserAsync(user);
        return CreatedAtAction(nameof(GetUserByUserId), new {id = user.UserId},user);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
    {
        if (id != user.UserId)
            return BadRequest();
        var existingUser = await _userService.GetUserByUserIdAsync(id);
        if (existingUser == null)
            return NotFound();

        await _userService.UpdateUserAsync(user);
        return NoContent();

    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SoftDeletedUser(int id)
    {
        var user = await _userService.GetUserByUserIdAsync(id);
        if (user == null)
            return NotFound();
        await _userService.SoftDeleteUserAsync(id);
        return NoContent();
    }
}

