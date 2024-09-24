

namespace DSS.Repository
{
    public interface InRolRepository
    {
        Task<Rol> GetByRolIdAsync(int id);
        Task<IEnumerable<Rol>> GetAllAsync();
        Task Async(Rol rol);
        Task UpdateAsync(Rol rol);
        Task DeleteAsync(int id);
    }
}
