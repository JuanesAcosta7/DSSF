using DSS.Context;
using DSS.Interfaces;
using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Service
{
    public interface InInfractionRepository
    {
        Task<IEnumerable<Infracction>> GetAllInfractionAsync();
        Task<Infracction> GetInfractionByInfractionIdAsync(int Id);
        Task<Infracction> CreateInfractionAsync(Infracction infracction);
        Task<Infracction> UpdateInfractionAsync(Infracction infracction);
        Task<Infracction> SoftDeleteInfractionAsync(int Id);
    }
    public class InfractionRepository : InInfractionRepository
    {
        private readonly SGITContex _context;
        public InfractionRepository(SGITContex context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Infracction>> GetAllInfractionAsync()
        {
            return await _context.infracctions
                .Where(s => !s.IsDelete)
                .ToListAsync();
        }
        public async Task CreateInfractionAsync(Infracction infracction)
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateInfractionAsync(Infracction infracction)
        {
            
        }

        public async Task SoftDeleteInfractionAsync(int id)
        {
            var infracction = await _context.infracctions.FindAsync(id);
            if (infracction != null)
            {
                infracction.IsDelete = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Infracction> GetInfractionByInfractionIdAsync(int Id)
        {
            return await _context.infracctions
            .FirstOrDefaultAsync(s => s.InfracctionId == Id && !s.IsDelete);
        }


    }
}
