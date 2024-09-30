using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Repository
{
    public interface InRolRepository
    {
        Task<Rol> GetRolByIdAsync(int id);
        Task<IEnumerable<Rol>> GetAllRolAsync();
        Task CreateRolAsync(Rol rol);
        Task UpdateRolAsync(Rol rol );
        Task DeleteRolAsync(int id);
    }

    public class RolRepository : InRolRepository
    {
        private readonly SGITContex _context;

        public RolRepository(SGITContex context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Rol>> GetAllRolAsync()
        {
            return await _context.Rols
                                 .Where(s => !s.IsDelete) // Excluye eliminados
                                 .ToListAsync();
        }

        public async Task<Rol> GetRolByIdAsync(int id)
        {
            return await _context.Rols
                                 .FirstOrDefaultAsync(s => s.RolId == id && !s.IsDelete);
        }

        public async Task DeleteRolAsync(int id)
        {
            var rol = await _context.Rols.FindAsync(id); // Cambiado a 'infraction' para mayor claridad
            if (rol != null && !rol.IsDelete) // Condición más clara
            {
                _context.Rols.Remove(rol); // Elimina el registro de la base de datos
                await _context.SaveChangesAsync();
            }
        }

        public async Task CreateRolAsync(Rol rol)
        {
            await _context.Rols.AddAsync(rol);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRolAsync(Rol rol)
        {
            _context.Rols.Update(rol);
            await _context.SaveChangesAsync();
        }
    }
}