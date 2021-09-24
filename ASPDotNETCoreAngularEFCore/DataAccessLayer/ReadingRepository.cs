using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPDotNETCoreAngularEFCore.DataAccessLayer.Repositories;
using ASPDotNETCoreAngularEFCore.Models;
using Microsoft.EntityFrameworkCore;
using Object = ASPDotNETCoreAngularEFCore.Models.Object;

namespace ASPDotNETCoreAngularEFCore.DataAccessLayer
{
    public class ReadingRepository : IReadingRepository
    {
        private readonly AspDotNetCoreAngularEfCoreContext dbContext;

        public ReadingRepository(AspDotNetCoreAngularEfCoreContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public async Task<int> SeedReadingTable()
        {
            Console.WriteLine("Data Access Layer: inside SeedReadingTable() method");

            // inserting 100 Building rows
            // inserting 500 Object rows, (5 objects for 1 building)
            for( var i = 1; i <= 100; i++ )
            {
                var building = new Building
                {
                    Name = "Building " + i,
                    Location = "Dhaka"
                };

                await dbContext.Buildings.AddAsync(building);
                await dbContext.SaveChangesAsync();
                var buildingId = building.Id;
                dbContext.Entry(building).State = EntityState.Detached;

                for( var j = 1; j <= 5; j++ )
                {
                    var objectNumber = (j + (5 * (i - 1)));
                    var obj = new Object
                    {
                        Name = "Object " + objectNumber,
                        BuildingId = buildingId
                    };

                    await dbContext.Objects.AddAsync(obj);
                    await dbContext.SaveChangesAsync();
                    dbContext.Entry(obj).State = EntityState.Detached;
                }
            }

            // inserting 1 Reading row for 1 Object
            // total 500 Reading rows for 1 minute
            // total 7,20,000 Reading rows for 1 day
            // total 2,62,8,00,000 Reading rows for 1 year
            // total 5,25,6,00,000 Reading rows for 2 year
            var startDateTime = new DateTime(2018, 1, 0, 0, 0, 0);
            var endDateTime = new DateTime(2020, 0, 0, 0, 0, 0);

            IEnumerable<Building> buildingList = await dbContext.Buildings.OrderBy(x => x.Id).ToListAsync();
            var random = new Random(DateTime.Now.Ticks.GetHashCode());
            var hourCounter = 0;
            var minuteCounter = 0;

            // inserting Reading rows for 1 month
            for( var dateTime = startDateTime; dateTime < endDateTime; dateTime = dateTime.AddMinutes(1) )
            {
                foreach( var building in buildingList )
                {
                    //var buildingId = building.Id;
                    var objectList = await dbContext.Objects
                        .Where(x => x.BuildingId == building.Id)
                        .OrderBy(x => x.Id)
                        .ToListAsync();

                    foreach( var obj in objectList )
                    {
                        var reading = new Reading
                        {
                            BuildingId = building.Id,
                            ObjectId = obj.Id,
                            Value = (1 + random.Next(25)),
                            Timestamp = dateTime
                        };

                        await dbContext.Readings.AddAsync(reading);
                        await dbContext.SaveChangesAsync();
                        dbContext.Entry(reading).State = EntityState.Detached;
                    }
                }

                minuteCounter++;
                if( minuteCounter < 60 )
                {
                    Console.WriteLine(dateTime.ToString("yyyy-MM-dd hh:mm:ss tt") + " -> done " + minuteCounter + "th minute data insertion");
                }
                else if( minuteCounter == 60 )
                {
                    minuteCounter = 0;
                    hourCounter++;
                    if( hourCounter < 24 )
                    {
                        Console.WriteLine(dateTime.ToString("yyyy-MM-dd hh:mm:ss tt") + " -> done " + hourCounter + "th hour data insertion");
                    }
                    else if( hourCounter == 24 )
                    {
                        hourCounter = 0;
                        Console.WriteLine(dateTime.ToString("yyyy-MM-dd hh:mm:ss tt") + " -> done 1 day data insertion");
                    }
                }
            }
            
            return 1;
        }

        public async Task<IEnumerable<Reading>> GetReadings(int buildingId, int objectId, DateTime from, DateTime to)
        {
            return await dbContext.Readings
                .Where(x => x.ObjectId == objectId)
                .Where(x => x.Timestamp >= from && x.Timestamp <= to)
                .OrderBy(x => x.Id)
                .ToListAsync();
        }
    }
}