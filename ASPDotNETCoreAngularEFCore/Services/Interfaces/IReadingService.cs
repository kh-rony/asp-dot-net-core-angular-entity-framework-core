using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ASPDotNETCoreAngularEFCore.Models;

namespace ASPDotNETCoreAngularEFCore.Services.Interfaces
{
    public interface IReadingService
    {
        public Task<int> SeedReadingTableService();
        public Task<IEnumerable<Reading>> GetReadingsService(int buildingId, int objectId, DateTime from, DateTime to);
    }
}