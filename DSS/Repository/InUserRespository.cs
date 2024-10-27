using BCrypt.Net;
using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Repository
{
    public interface InUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task<IEnumerable<User>> GetAllUserAsync();
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
    }
    
    public class UserRepository : InUserRepository
    {
        private readonly SGITContex _context;

        public UserRepository(SGITContex context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await _context.users
                                 .Where(s => !s.IsDelete) // Excluye eliminados
                                 .ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.users
                .AsNoTracking()
                                 .FirstOrDefaultAsync(s => s.UserId == id && !s.IsDelete);
        }
        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.users
                .AsNoTracking()
                                 .FirstOrDefaultAsync(s => s.Email == email && !s.IsDelete);
        }
        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.users.FindAsync(id); // Cambiado a 'infraction' para mayor claridad
            if (user != null && !user.IsDelete) // Condición más clara
            {
                _context.users.Remove(user); // Elimina el registro de la base de datos
                await _context.SaveChangesAsync();
            }
        }

        public async Task CreateUserAsync(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}