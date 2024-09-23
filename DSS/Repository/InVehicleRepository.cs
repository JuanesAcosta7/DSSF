using DSS.Model;

namespace DSS.Repository
{
    public interface InVehicleRepository
    {
        Task<Vehicles> GetByVehicleIdAsync(int id);
        Task<IEnumerable<Vehicles>> GetAllAsync();
        Task AddAsync(Vehicles vehicles);
        Task UpdateAsync(Vehicles vehicles);
        Task DeleteAsync(int id);
    }
}
