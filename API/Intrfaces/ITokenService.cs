using API.Entities;

namespace API.Intrfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}