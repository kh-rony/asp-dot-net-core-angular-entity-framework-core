using System;
using System.Collections.Generic;
using System.Linq;
using ASPDotNETCoreAngularEFCore.DataAccessLayer.Repositories;
using ASPDotNETCoreAngularEFCore.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPDotNETCoreAngularEFCore.DataAccessLayer
{
    public class TestRepository : ITestRepository
    {
        private readonly AspDotNetCoreAngularEfCoreContext dbContext;

        public TestRepository(AspDotNetCoreAngularEfCoreContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public IEnumerable<Test> GetTests()
        {
            return dbContext.Tests.ToList().OrderBy(x => x.Id);
        }

        public Test GetTestById(int id)
        {
            Test test = dbContext.Tests.Find(id);
            return test;
        }

        public int AddTest(Test test)
        {
            dbContext.Tests.Add(test);
            dbContext.SaveChanges();

            return 1;
        }

        public int UpdateTest(Test test)
        {
            dbContext.Entry(test).State = EntityState.Modified;
            dbContext.SaveChanges();

            return 1;
        }

        public int DeleteTest(int id)
        {
            Test test = dbContext.Tests.Find(id);
            dbContext.Tests.Remove(test);
            dbContext.SaveChanges();

            return 1;
        }
    }
}