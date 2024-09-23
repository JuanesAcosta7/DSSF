using DSS.Model;

namespace DSS.Repository
{
    public interface InDriverRepository
    {
        Task<Driver> GetByDiverIdAsync(int id);
        Task<IEnumerable<Driver>> GetAllAsync();
        Task CreateAsync(Driver driver);
        Task UpdateAsync(Driver driver);
        Task SoftDeleteAsync(int id);
    }
 
}
