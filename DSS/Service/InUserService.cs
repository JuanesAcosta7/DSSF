using DSS.Interfaces;
using DSS.Model;

namespace DSS.Service
{
    public interface InUserService
    {
        Task<IEnumerable<User>> GetAllUserAsync();
        Task<User> GetUserByUserIdAsync(int userId);
        Task<User> CreateUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
        Task<User> SoftDeleteUserAsync(int userId);
    }
    public class UserService : InUserService
    {
        private readonly InUserRespository _userRepository;

        public UserService(InUserRespository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await _userRepository.GetAllUserAsync();
        }
        public async Task<User> GetUserByUserIdAsync(int userId)
        {
            return await _userRepository.GetUserByUserIdAsync(userId);
        }
        public async Task CreateUserAsync(User user)
        {
            await _userRepository.CreateUserAsync(user);
        }
        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateUserAsync(user);
        }
        public async Task SoftDeleteUserAsync(int userId)
        {
            await _userRepository.SoftDeleteUserAsync(userId);
        }

    }
}
