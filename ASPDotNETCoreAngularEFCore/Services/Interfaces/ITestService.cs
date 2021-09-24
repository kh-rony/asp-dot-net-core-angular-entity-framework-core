using System.Collections.Generic;
using ASPDotNETCoreAngularEFCore.Models;

namespace ASPDotNETCoreAngularEFCore.Services.Interfaces
{
    public interface ITestService
    {
        public IEnumerable<Test> GetTestsService();
        public Test GetTestByIdService(int id);
        public int AddTestService(Test test);
        public int UpdateTestService(Test test);
        public int DeleteTestService(int id);
    }
}