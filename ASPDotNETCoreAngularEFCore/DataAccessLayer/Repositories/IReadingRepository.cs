using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ASPDotNETCoreAngularEFCore.Models;

namespace ASPDotNETCoreAngularEFCore.DataAccessLayer.Repositories
{
    public interface IReadingRepository
    {
        public Task<int> SeedReadingTable();
        public Task<IEnumerable<Reading>> GetReadings(int buildingId, int objectId, DateTime from, DateTime to);
    }
}