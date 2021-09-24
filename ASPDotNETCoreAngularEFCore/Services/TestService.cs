using System.Collections.Generic;
using ASPDotNETCoreAngularEFCore.DataAccessLayer;
using ASPDotNETCoreAngularEFCore.Models;
using ASPDotNETCoreAngularEFCore.Services.Interfaces;

namespace ASPDotNETCoreAngularEFCore.Services
{
    public class TestService : ITestService
    {
        private readonly TestRepository testRepository = new TestRepository(new AspDotNetCoreAngularEfCoreContext());

        public IEnumerable<Test> GetTestsService()
        {
            return testRepository.GetTests();
        }

        public Test GetTestByIdService(int id)
        {
            return testRepository.GetTestById(id);
        }

        public int AddTestService(Test test)
        {
            return testRepository.AddTest(test);
        }

        public int UpdateTestService(Test test)
        {
            return testRepository.UpdateTest(test);
        }

        public int DeleteTestService(int id)
        {
            return testRepository.DeleteTest(id);
        }
    }
}