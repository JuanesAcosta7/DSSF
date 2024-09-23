using DSS.Model;

namespace DSS.Repository
{
    public interface InInfractionRepository
    {
        Task<Infracction> GetByInfractionIdAsync(int id);
        Task<IEnumerable<Infracction>> GetAllAsync();
        Task AddAsync(Infracction infracction);
        Task UpdateAsync(Infracction infracction);
        Task DeleteAsync(int id);
    }
}
