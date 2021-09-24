using System.Collections.Generic;
using ASPDotNETCoreAngularEFCore.Models;
using ASPDotNETCoreAngularEFCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace ASPDotNETCoreAngularEFCore.Controllers
{
    [Route("api/test")]
    public class TestController : Controller
    {
        private readonly TestService testService = new TestService();

        [HttpGet]
        [Route("get")]
        public IEnumerable<Test> GetTests()
        {
            return testService.GetTestsService();
        }

        [HttpGet]
        [Route("get/{id:int}")]
        public Test GetTestById(int id)
        {
            return testService.GetTestByIdService(id);
        }

        [HttpPost]
        [Route("add")]
        public int AddTest([FromBody] Test test)
        {
            return testService.AddTestService(test);
        }

        [HttpPut]
        [Route("update")]
        public int UpdateTest([FromBody] Test test)
        {
            return testService.UpdateTestService(test);
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public int DeleteTest(int id)
        {
            return testService.DeleteTestService(id);
        }
    }
}