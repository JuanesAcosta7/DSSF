using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Repository
{
    public interface InInfractionRepository
    {
        Task<Infracction> GetInfractionByIdAsync(int id);
        Task<IEnumerable<Infracction>> GetAllInfractionsAsync();
        Task CreateInfractionAsync(Infracction infracction);
        Task UpdateInfractionAsync(Infracction infracction);
        Task DeleteInfractionAsync(int id);
    }

    public class InfractionRepository : InInfractionRepository
    {
        private readonly SGITContex _context;

        public InfractionRepository(SGITContex context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Infracction>> GetAllInfractionsAsync()
        {
            return await _context.infracctions
                                 .Where(s => !s.IsDelete) // Excluye eliminados
                                 .ToListAsync();
        }

        public async Task<Infracction> GetInfractionByIdAsync(int id)
        {
            return await _context.infracctions
                         .AsNoTracking()
                         .FirstOrDefaultAsync(s => s.InfracctionId == id && !s.IsDelete);
        }

        public async Task DeleteInfractionAsync(int id)
        {
            var infraction = await _context.infracctions.FindAsync(id); // Cambiado a 'infraction' para mayor claridad
            if (infraction != null && !infraction.IsDelete) // Condición más clara
            {
                _context.infracctions.Remove(infraction); // Elimina el registro de la base de datos
                await _context.SaveChangesAsync();
            }
        }

        public async Task CreateInfractionAsync(Infracction infracction)
        {
            await _context.infracctions.AddAsync(infracction);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateInfractionAsync(Infracction infracction)
        {
            _context.infracctions.Update(infracction);
            await _context.SaveChangesAsync();
        }
    }
}