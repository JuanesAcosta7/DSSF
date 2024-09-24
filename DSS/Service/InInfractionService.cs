using DSS.Interfaces;
using DSS.Model;

namespace DSS.Service
{
    public interface InInfractionService
    {
        Task<IEnumerable<Infracction>> GetAllInfractionAsync();
        Task<Infracction> GetInfractionByInfractionIdAsync(int Id);
        Task<Infracction> CreateInfractionAsync(Infracction infracction);
        Task<Infracction> UpdateInfractionAsync(Infracction infracction);
        Task<Infracction> SoftDeleteInfractionAsync(int Id);
    }
    public class InfractionService : InInfractionService
    {
        private readonly InInfractionRepository _InfractionRepository;

        public InfractionService(InInfractionRepository infractionRepository)
        {
            _InfractionRepository = infractionRepository;
        }

        public async Task<Infracction> CreateInfractionAsync(Infracction infracction)
        {
            await _InfractionRepository.CreateInfractionAsync(infracction);
        }

        public async Task<IEnumerable<Infracction>> GetAllInfractionAsync()
        {
            return await _InfractionRepository.GetAllInfractionAsync();
        }

        public async Task<Infracction> GetInfractionByInfractionIdAsync(int Id)
        {
            return await _InfractionRepository.GetInfractionByInfractionIdAsync(Id);
        }

        public async Task<Infracction> SoftDeleteInfractionAsync(int Id)
        {
            await _InfractionRepository.SoftDeleteInfractionAsync(Id);
        }

        public async Task<Infracction> UpdateInfractionAsync(Infracction infracction)
        {
            await _InfractionRepository.UpdateInfractionAsync(infracction);
        }
    }
}
