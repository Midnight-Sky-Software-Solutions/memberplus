using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Filters
{
    public class AuthorizeAccountAttribute : TypeFilterAttribute
    {
        public AuthorizeAccountAttribute() : base(typeof(AuthorizeAccountFilter)) { }
    }
}
