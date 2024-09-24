using DSS.Interfaces;
using DSS.Model;
using DSS.Repository;

namespace DSS.Service
{
    public interface InUserTypeService
    {
        Task<IEnumerable<UserType>> GetAllUserTypeAsync();
        Task<UserType> GetUserByUserTypeIdAsync(int userTypeId);
        Task<UserType> CreateUserTypeAsync(User userType);
        Task<UserType> UpdateUserTypeAsync(User userTpy);
        Task<UserType> SoftDeleteUserTypeAsync(int userTypeId);
    }
    public class UserTypeService : InUserTypeService
    {
        private readonly InUserTypeRespository _userTypeRepository;

        public UserTypeService(InUserTypeRespository userTypeRepository)
        {
            _userTypeRepository = userTypeRepository;
        }
        public async Task<IEnumerable<UserType>> GetAllUserTypeAsync()
        {
            return await _userTypeRepository.GetAllUserTypeAsync();
        }
        public async Task<UserType> GetUserByUserTypeIdAsync(int userTypeId)
        {
            return await _userTypeRepository.GetUserByUserIdAsync(userTypeId);
        }
        public async Task CreateUserTypeAsync(UserType userType)
        {
            await _userTypeRepository.CreateUserAsync(userType);
        }
        public async Task UpdateUserTypeAsync(UserType userType)
        {
            await _userTypeRepository.UpdateUserAsync(userType);
        }
        public async Task SoftDeleteUserTypeAsync(int userTypeId)
        {
            await _userTypeRepository.SoftDeleteUserAsync(userTypeId);
        }

    }
}
