using DSS.Context;
using DSS.Model;
using DSS.Repository;
using Microsoft.EntityFrameworkCore;

namespace DSS.Services
{
    public interface InVehicleServices
    {
        Task<IEnumerable<Vehicles>> GetAllVehiclesAsync(); 
        Task<Vehicles> GetVehicleByIdAsync(int id);   
        Task CreateVehicleAsync(Vehicles vehicle);     
        Task UpdateVehicleAsync(Vehicles vehicle);     
        Task DeleteVehicleAsync(int id);
    }

    public class VehiclesServices : InVehicleServices
    {
        private readonly InVehicleRepository _vehicleRepository;

        public VehiclesServices(InVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<IEnumerable<Vehicles>> GetAllVehiclesAsync()
        {
            return await _vehicleRepository.GetAllVehiclesAsync();
        }

        public async Task<Vehicles> GetVehicleByIdAsync(int id)
        {
            return await _vehicleRepository.GetVehicleByIdAsync(id);
        }

        public async Task CreateVehicleAsync(Vehicles vehicle)
        {
            await _vehicleRepository.CreateVehicleAsync(vehicle);
        }

        public async Task UpdateVehicleAsync(Vehicles vehicle)
        {
            await _vehicleRepository.UpdateVehicleAsync(vehicle);
        }

        public async Task DeleteVehicleAsync(int id)
        {
            await _vehicleRepository.DeleteVehicleAsync(id);
        }
    }
}
