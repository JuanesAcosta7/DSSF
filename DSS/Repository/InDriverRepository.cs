using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Repository
{
    public interface InDriverRepository
    {
        Task<Driver> GetDriversByIdAsync(int id);
        Task<IEnumerable<Driver>> GetAllDriversAsync();
        Task CreateDriversAsync(Driver driver);
        Task UpdateDriversAsync(Driver driver);
        Task DeleteDriverAsync(int id);


    }
    public class DriverRepository : InDriverRepository
    {
        private readonly SGITContex _context;

        public DriverRepository(SGITContex context)
        {
            _context = context;
        }
        public async   Task<IEnumerable<Driver>> GetAllDriversAsync()
        {
            return await _context.Drivers
                .Where(s => !s.IsDeleted) // Excluye eliminados
                .ToListAsync();
        }

        public async Task<Driver> GetDriversByIdAsync(int id)
        {
            return await _context.Drivers
                .FirstOrDefaultAsync(s => s.DriverId == id && !s.IsDeleted);
        }

        public async Task DeleteDriverAsync(int id)
        {
            var subject = await _context.Drivers.FindAsync(id);
            if (subject != null)
            {
                subject.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task CreateDriversAsync(Driver subject)
        {
            await _context.Drivers.AddAsync(subject);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDriversAsync(Driver subject)
        {
            _context.Drivers.Update(subject);
            await _context.SaveChangesAsync();
        }


    }
}
