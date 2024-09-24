using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace DSS.Interfaces
{
    public interface InRolRespository
    {
        Task<User> GetRolByRolIdAsync(int id);
        Task<IEnumerable<Rol>> GetAllRolAsync();
        Task CreateRolAsync(Rol rol);
        Task UpdateRolAsync(Rol rol);
        Task SoftDeleteRolAsync(int id);
    }
    public class RolRepository : InRolRespository
    {
        private readonly SGITContex _context;
        public RolRepository(SGITContex context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Rol>> GetAllRollAsync()
        {
            return await _context.Rols
                .Where(s => !s.IsDelete)
                .ToListAsync();
        }
        public async Task<Rol> GeRolByRolIdAsync(int id)
        {
            return await _context.Rols
                .FirstOrDefaultAsync(s => s.RolId == id && !s.IsDelete);
        }
        public async Task CreateRolAsync(Rol rol)
        {
            await _context.Rols.CreateAsync(rol);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateRolAsync(Rol rol)
        {
            await _context.Rols.UpdateAsync(rol);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteRolAsync(int id)
        {
            var rol = await _context.Rols.FindAsync(id);
            if (rol != null)
            {
                rol.IsDelete = true;
                await _context.SaveChangesAsync();
            }
        }

    }
}
