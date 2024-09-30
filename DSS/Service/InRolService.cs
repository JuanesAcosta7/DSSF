using DSS.Model;
using DSS.Repository;




namespace DSS.Services
{
    public interface InRolServices
    {
        Task<IEnumerable<Rol>> GetAllRolAsync();
        Task<Rol> GetRolByIdAsync(int id);
        Task CreateRolAsync(Rol rol);
        Task UpdateRolAsync(Rol rol);
        Task DeleteRolAsync(int id);
    }
    public class RolServices : InRolServices
    {
        private readonly InRolRepository _rolRepository;

        public RolServices(InRolRepository rolRepository)
        {
            _rolRepository = rolRepository;
        }

        public async Task<IEnumerable<Rol>> GetAllRolAsync()
        {
            return await _rolRepository.GetAllRolAsync();
        }

        public async Task<Rol> GetRolByIdAsync(int id)
        {
            return await _rolRepository.GetRolByIdAsync(id);
        }

        public async Task CreateRolAsync(Rol rol)
        {
            await _rolRepository.CreateRolAsync(rol);
        }

        public async Task UpdateRolAsync(Rol rol)
        {
            await _rolRepository.UpdateRolAsync(rol);
        }

        public async Task DeleteRolAsync(int id)
        {
            await _rolRepository.DeleteRolAsync(id);
        }
    }
}
