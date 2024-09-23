using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace DSS.Interfaces
{
    public interface InUserRespository
    {
        Task<User> GetUserByUserIdAsync(int id);
        Task<IEnumerable<User>> GetAllUserAsync();
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task SoftDeleteUserAsync(int id);
    }
    public class UserRepository : InUserRespository
    {
        private readonly SGITContex _context;
        public UserRepository(SGITContex context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await _context.users
                .Where(s => !s.IsDelete)
                .ToListAsync();
        }
        public async Task<User> GetUserByUserIdAsync(int id)
        {
            return await _context.users
                .FirstOrDefaultAsync(s => s.UserId == id && !s.IsDelete);
        }
        public async Task CreateUserAsync(User user)
        {
            await _context.users.CreateUserAsync(user);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUserAsync(User user)
        {
            await _context.users.UpdateAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteUserAsync(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user != null)
            {
                user.IsDelete = true;
                await _context.SaveChangesAsync();
            }
        }

}
