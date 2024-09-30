using DSS.Model;
using DSS.Repository;




namespace DSS.Services
{
    public interface InInfractionServices
    {
        Task<IEnumerable<Infracction>> GetAllInfractionAsync();
        Task<Infracction> GetInfractionByIdAsync(int id);
        Task CreateInfractionAsync(Infracction infracction);
        Task UpdateInfractionAsync(Infracction infracction);
        Task DeleteInfractionAsync(int id);
    }
    public class InfractionServices : InInfractionServices
    {
        private readonly InInfractionRepository _infractionRepository;

        public InfractionServices(InInfractionRepository InfractionRepository)
        {
            _infractionRepository = InfractionRepository;
        }

        public async Task<IEnumerable<Infracction>> GetAllInfractionAsync()
        {
            return await _infractionRepository.GetAllInfractionsAsync();
        }

        public async Task<Infracction> GetInfractionByIdAsync(int id)
        {
            return await _infractionRepository.GetInfractionByIdAsync(id);
        }

        public async Task CreateInfractionAsync(Infracction infracction)
        {
            await _infractionRepository.CreateInfractionAsync(infracction);
        }

        public async Task UpdateInfractionAsync(Infracction infracction)
        {
            await _infractionRepository.UpdateInfractionAsync(infracction);
                }

        public async Task DeleteInfractionAsync(int id)
        {
            await _infractionRepository.DeleteInfractionAsync(id);
        }
    }
}
