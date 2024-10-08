﻿using DSS.Model;
using DSS.Services;
using Microsoft.AspNetCore.Mvc;
using DSS.DTOs;
[ApiController]
[Route("api/[controller]")]
public class UserControllers : ControllerBase
{
    private readonly InUserServices _userService;

    public UserControllers(InUserServices userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
    {
        var users = await _userService.GetAllUserAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Rol>> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);  // Si los datos no son válidos
        }

        var user = await _userService.LoginAsync(loginDto.Email, loginDto.Password);

        if (user == null)
        {
            return Unauthorized("Credenciales inválidas.");
        }

        // Aquí podrías generar un token JWT o similar, pero por ahora retornamos los datos del usuario
        return Ok(new { message = "Inicio de sesión exitoso", userId = user.UserId });
    }
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateUser([FromBody] User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _userService.CreateUserAsync(user);

        return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
    }
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
    {
        if (id != user.UserId)
        {
            return BadRequest();
        }

        var users = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        await _userService.UpdateUserAsync(user);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteRol(int id)
    {
        var users = await _userService.GetUserByIdAsync(id);
        if (users == null)
        {
            return NotFound();
        }

        await _userService.DeleteUserAsync(id);
        return NoContent();
    }
}


