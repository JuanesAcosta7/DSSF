using DSS.Interfaces;
using DSS.Model;

namespace DSS.Service
{
    public interface InUserTypeService
    {
        Task<IEnumerable<UserType>> GetAllUserTypeAsync();
        Task<UserType> GetUserTypeByUserTypeIdAsync(int Id);
        Task<UserType> CreateUserTypeAsync(UserType usertype);
        Task<UserType> UpdateUserTypeAsync(UserType usertype);
        Task<UserType> SoftDeleteUserTypeAsync(int Id);
    }
    public class UserTypeService : InUserTypeService
    {
        private readonly InUserTypeRespository _usertypeRepository;

        public UserTypeService(InUserTypeRespository usertypeRepository)
        {
            _usertypeRepository = usertypeRepository;
        }
        public async Task<IEnumerable<UserType>> GetAllUserTypeAsync()
        {
            return await _usertypeRepository.GetAllUserTypeAsync();
        }
        public async Task<User> GetUserTypeByUserTypeIdAsync(int Id)
        {
            return await _usertypeRepository.GetUserTypeByUserTypeIdAsync(Id);
        }
        public async Task CreateUserTypeAsync(UserType usertype)
        {
            await _usertypeRepository.CreateUserTypeAsync(usertype);
        }
        public async Task UpdateUserTypeAsync(UserType usertype)
        {
            await _usertypeRepository.UpdateUserTypeAsync(usertype);
        }
        public async Task SoftDeleteUserTypeAsync(int Id)
        {
            await _usertypeRepository.SoftDeleteUserTypeAsync(Id);
        }

    }
}
