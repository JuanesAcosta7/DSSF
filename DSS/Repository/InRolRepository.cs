using DSS.Model;

namespace DSS.Repository
{
    public interface InRolRepository
    {
        Task<Rol> GetByRolIdAsync(int id);
        Task<IEnumerable<Rol>> GetAllAsync();
        Task AddAsync(Rol rol);
        Task UpdateAsync(Rol rol);
        Task DeleteAsync(int id);
    }
}
