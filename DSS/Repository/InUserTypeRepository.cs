using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Repository
{
    public interface InUserTypeRepository
    {
        Task<UserType> GetUserTypeByIdAsync(int id);
        Task<IEnumerable<UserType>> GetAllUserTypeAsync();
        Task CreateUserTypeAsync(UserType usertype);
        Task UpdateUserTypeAsync(UserType usertype);
        Task DeleteUserTypeAsync(int id);
    }

    public class UserTypeRepository : InUserTypeRepository
    {
        private readonly SGITContex _context;

        public UserTypeRepository(SGITContex context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserType>> GetAllUserTypeAsync()
        {
            return await _context.UserTypes
                                 .Where(s => !s.IsDelete) // Excluye eliminados
                                 .ToListAsync();
        }

        public async Task<UserType> GetUserTypeByIdAsync(int id)
        {
            return await _context.UserTypes
                .AsNoTracking()
                                 .FirstOrDefaultAsync(s => s.UserTypeId == id && !s.IsDelete);
        }

        public async Task DeleteUserTypeAsync(int id)
        {
            var userT = await _context.UserTypes.FindAsync(id); // Cambiado a 'infraction' para mayor claridad
            if (userT != null && !userT.IsDelete) // Condición más clara
            {
                _context.UserTypes.Remove(userT); // Elimina el registro de la base de datos
                await _context.SaveChangesAsync();
            }
        }

        public async Task CreateUserTypeAsync(UserType usertype)
        {
            await _context.UserTypes.AddAsync(usertype);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserTypeAsync(UserType usertype)
        {
            _context.UserTypes.Update(usertype);
            await _context.SaveChangesAsync();
        }
    }
}