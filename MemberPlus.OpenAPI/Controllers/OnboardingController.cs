using MemberPlus.OpenAPI.Model.Onboarding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnboardingController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Onboard(OnboardTenant tenant)
        {

            return Created();
        }
    }
}
