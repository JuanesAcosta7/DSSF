using DSS.Model;
using DSS.Repository;




namespace DSS.Services
{
    public interface InUserTypeServices
    {
        Task<IEnumerable<UserType>> GetAllUserTAsync();
        Task<UserType> GetUserTByIdAsync(int id);
        Task CreateUserTAsync(UserType usert);
        Task UpdateUserTAsync(UserType usert);
        Task DeleteUserTAsync(int id);
    }
    public class UserTServices : InUserTypeServices
    {
        private readonly InUserTypeRepository _usertRepository;

        public UserTServices(InUserTypeRepository usertRepository)
        {
            _usertRepository = usertRepository;
        }

        public async Task<IEnumerable<UserType>> GetAllUserTAsync()
        {
            return await _usertRepository.GetAllUserTypeAsync();
        }

        public async Task<UserType> GetUserTByIdAsync(int id)
        {
            return await _usertRepository.GetUserTypeByIdAsync(id);
        }

        public async Task CreateUserTAsync(UserType usert)
        {
            await _usertRepository.CreateUserTypeAsync(usert);
        }

        public async Task UpdateUserTAsync(UserType usert)
        {
            await _usertRepository.UpdateUserTypeAsync(usert);
        }

        public async Task DeleteUserTAsync(int id)
        {
            await _usertRepository.DeleteUserTypeAsync(id);
        }
    }
}
