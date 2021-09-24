using System.Collections.Generic;
using ASPDotNETCoreAngularEFCore.Models;

namespace ASPDotNETCoreAngularEFCore.DataAccessLayer.Repositories
{
    public interface ITestRepository
    {
        public IEnumerable<Test> GetTests();
        public Test GetTestById(int id);
        public int AddTest(Test building);
        public int UpdateTest(Test building);
        public int DeleteTest(int id);
    }
}