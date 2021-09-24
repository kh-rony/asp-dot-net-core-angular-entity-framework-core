using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ASPDotNETCoreAngularEFCore.Models;
using ASPDotNETCoreAngularEFCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace ASPDotNETCoreAngularEFCore.Controllers
{
    [Route("api/reading")]
    public class ReadingController : Controller
    {
        private readonly ReadingService readingService = new ReadingService();
        
        [HttpGet]
        [Route("seed-reading-table")]
        public async Task<int> SeedReadingTable()
        {
            return await readingService.SeedReadingTableService();
        }

        [HttpGet]
        [Route("get")]
        public async Task<IEnumerable<Reading>> GetReadings([FromBody] GetReadingsRequest request)
        {
            var buildingId = request.buildingId;
            var objectId = request.objectId;
            var from = request.dateTimeFrom;
            var to = request.dateTimeTo;

            return await readingService.GetReadingsService(buildingId, objectId, from, to);
        }

        public class GetReadingsRequest
        {
            public int buildingId { get; set; }
            public int objectId { get; set; }
            public DateTime dateTimeFrom { get; set; }
            public DateTime dateTimeTo { get; set; }
        }
    }
}