using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace DSS.Interfaces
{
    public interface InUserTypeRespository
    {
        Task<UserType> GetUserTypeByUserTypeIdAsync(int id);
        Task<IEnumerable<UserType>> GetAllUserTypeAsync();
        Task CreateUserTypeAsync(UserType userType);
        Task UpdateUserTypeAsync(UserType userType);
        Task SoftDeleteUserTypeAsync(int id);
    }
    public class UserTypeRepository : InUserTypeRespository
    {
        private readonly SGITContex _context;
        public UserTypeRepository(SGITContex context)
        {
            _context = context;
        }
        public async Task<IEnumerable<UserType>> GetAllUserTypeAsync()
        {
            return await _context.UserTypes
                .Where(s => !s.IsDelete)
                .ToListAsync();
        }
        public async Task<UserType> GetUserTypeByUserTypeIdAsync(int id)
        {
            return await _context.UserTypes
                .FirstOrDefaultAsync(s => s.UserTypeId == id && !s.IsDelete);
        }
        public async Task CreateUserTypeAsync(UserType userType)
        {
            await _context.UserTypes.CreateUserTypeAsync(userType);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUserTypeAsync(UserType userType)
        {
            await _context.UserTypes.UpdateAsync(userType);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteUserTypeAsync(int id)
        {
            var usertype = await _context.UserTypes.FindAsync(id);
            if (usertype != null)
            {
                usertype.IsDelete = true;
                await _context.SaveChangesAsync();
            }
        }

    }
}
