using DSS.Interfaces;
using DSS.Model;

namespace DSS.Service
{
    public interface InRolService
    {
        Task<IEnumerable<Rol>> GetAllRolAsync();
        Task<Rol> GetRolByRolIdAsync(int rolId);
        Task<Rol> CreateRolAsync(Rol rol);
        Task<Rol> UpdateRolAsync(Rol rol);
        Task<Rol> SoftDeleteRolAsync(int rolId);
    }
    public class RolService : InRolService
    {
        private readonly InRolRespository _RolRepository;

        public RolService(InRolRespository rolRepository)
        {
            _RolRepository = rolRepository;
        }
        public async Task<IEnumerable<Rol>> GetAllRolAsync()
        {
            return await _RolRepository.GetAllRolAsync();
        }
        public async Task<Rol> GetRolByRolIdAsync(int rolId)
        {
           return await _RolRepository.GetRolByRolIdAsync(rolId);

        }
        public async Task CreateRolAsync(Rol rol)
        {
            await _RolRepository.CreateRolAsync(rol);
        }
        public async Task UpdateRolAsync(Rol rol)
        {
            await _RolRepository.UpdateRolAsync(rol);
        }
        public async Task SoftDeleteRolAsync(int rolId)
        {
            await _RolRepository.SoftDeleteRolAsync(rolId);
        }
    }
}
