using DSS.Model;

namespace DSS.Repository
{
    public interface InDriverRepsitory
    {
        Task<InDriverRepsitory> GetByDriverIdAsync(int id);
        Task<IEnumerable<Driver>> GetAllAsync();
        Task AddAsync(Driver driver);
        Task UpdateAsync(Driver driver);
        Task DeleteAsync(int id);
    }
}
