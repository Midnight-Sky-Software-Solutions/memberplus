using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.AdminAPI
{
    public class AuthorizeAccountAttribute : TypeFilterAttribute
    {
        public AuthorizeAccountAttribute() : base(typeof(AuthorizeAccountFilter))
        {
        }
    }
}
