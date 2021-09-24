using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ASPDotNETCoreAngularEFCore.DataAccessLayer;
using ASPDotNETCoreAngularEFCore.Models;
using ASPDotNETCoreAngularEFCore.Services.Interfaces;

namespace ASPDotNETCoreAngularEFCore.Services
{
    public class ReadingService : IReadingService
    {
        private readonly ReadingRepository readingRepository = new ReadingRepository(new AspDotNetCoreAngularEfCoreContext());

        public async Task<int> SeedReadingTableService()
        {
            return await readingRepository.SeedReadingTable();
        }
        public async Task<IEnumerable<Reading>> GetReadingsService(int buildingId, int objectId, DateTime from, DateTime to)
        {
            return await readingRepository.GetReadings(buildingId, objectId, from, to);
        }
    }
}