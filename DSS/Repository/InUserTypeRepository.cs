using DSS.Model;

namespace DSS.Repository
{
    public interface InUserTypeRepository
    {
        Task<UserType> GetByUserTypeIdAsync(int id);
        Task<IEnumerable<UserType>> GetAllAsync();
        Task AddAsync(UserType user);
        Task UpdateAsync(UserType user);
        Task DeleteAsync(int id);
    }
}
