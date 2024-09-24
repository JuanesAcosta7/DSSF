using DSS.Context;
using DSS.Model;
using Microsoft.EntityFrameworkCore;

namespace DSS.Repository
{
    public interface InVehicleRepository
    {
        Task<Vehicles> GetVehicleByIdAsync(int id);
        Task<IEnumerable<Vehicles>> GetAllVehiclesAsync();
        Task CreateVehicleAsync(Vehicles vehicle);
        Task UpdateVehicleAsync(Vehicles vehicle);
        Task DeleteVehicleAsync(int id);
    }

    public class VehiclesRepository : InVehicleRepository
    {
        private readonly SGITContex _context;

        public VehiclesRepository(SGITContex context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Vehicles>> GetAllVehiclesAsync()
        {
            return await _context.Vehicles
                .Where(s => !s.IsDelete) // Excludes deleted
                .ToListAsync();
        }

        public async Task<Vehicles> GetVehicleByIdAsync(int id)
        {
            return await _context.Vehicles
                .FirstOrDefaultAsync(s => s.VehicleId == id && !s.IsDelete);
        }

        public async Task DeleteVehicleAsync(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle != null)
            {
                vehicle.IsDelete = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task CreateVehicleAsync(Vehicles vehicle)
        {
            await _context.Vehicles.AddAsync(vehicle);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateVehicleAsync(Vehicles vehicle)
        {
            _context.Vehicles.Update(vehicle);
            await _context.SaveChangesAsync();
        }
    }
}