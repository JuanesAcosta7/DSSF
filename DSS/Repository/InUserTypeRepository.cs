using DSS.Context;
using DSS.Interfaces;
using DSS.Model;

namespace DSS.Repository
{
    public interface InUserTypeRepository
    {
        Task<UserType> GetByUserTypeIdAsync(int id);
        Task<IEnumerable<UserType>> GetAllAsync();
        Task AddAsync(UserType user);
        Task UpdateAsync(UserType user);
        Task DeleteAsync(int id);
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
            return await _context.userTypes
                .Where(s => !s.IsDelete)
                .ToListAsync();
        }
        public async Task<UserType> GetUserByUserTypeIdAsync(int id)
        {
            return await _context.userTypes
                .FirstOrDefaultAsync(s => s.UserTypeId == id && !s.IsDelete);
        }
        public async Task CreateUserTypeAsync(UserType userType)
        {
            await _context.userTypes.CreateUserTypeAsync(userType);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUserTypeAsync(UserType userType)
        {
            await _context.userTypes.UpdateAsync(userType);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteUserTypeAsync(int id)
        {
            var UserType = await _context.userTypes.FindAsync(id);
            if (UserType != null)
            {
                UserType.IsDelete = true;
                await _context.SaveChangesAsync();
            }
        }

    }
}
