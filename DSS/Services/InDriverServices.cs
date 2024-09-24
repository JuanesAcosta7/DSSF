using DSS.Context;
using DSS.Model;
using DSS.Repository;
using Microsoft.EntityFrameworkCore;




namespace DSS.Services
{
    public interface InDriverServices
    {
        Task<IEnumerable<Driver>> GetAllDriversAsync();
        Task<Driver> GetDriversByIdAsync(int id);
        Task CreateDriversAsync(Driver Driver);
        Task UpdateDriversAsync(Driver Driver);
        Task DeleteDriversAsync(int id);
    }
    public class DriverServices : InDriverServices
    {
        private readonly InDriverRepository _DriverRepository;

        public DriverServices(InDriverRepository DriverRepository)
        {
            _DriverRepository = DriverRepository;
        }

        public async Task<IEnumerable<Driver>> GetAllDriversAsync()
        {
            return await _DriverRepository.GetAllDriversAsync();
        }

        public async Task<Driver> GetDriversByIdAsync(int id)
        {
            return await _DriverRepository.GetDriversByIdAsync(id);
        }

        public async Task CreateDriversAsync(Driver Driver)
        {
            await _DriverRepository.CreateDriversAsync(Driver);
        }

        public async Task UpdateDriversAsync(Driver Driver)
        {
            await _DriverRepository.UpdateDriversAsync(Driver);
        }

        public async Task DeleteDriversAsync(int id)
        {
            await _DriverRepository.DeleteDriverAsync(id);
        }
    }
}
