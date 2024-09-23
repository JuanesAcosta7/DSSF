using DSS.Model;

namespace DSS.Interfaces
{
    public interface InUserRespository
    {
        Task<User> GetByUserIdAsync(int id);
        Task<IEnumerable<User>> GetAllAsync();
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(int id);
    }
}
