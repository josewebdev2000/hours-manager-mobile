/** Jwt Token Parser to extract info from JWT Tokens */
class JwtTokenParser
{
    static extractJwtToken(jwtTokenCookie)
    {
        return jwtTokenCookie.split(';')[0].split('=')[1];
    }

    static extractJwtExpiryDate(jwtTokenCookie)
    {
        return jwtTokenCookie.split(";").find(part => part.trim().startsWith("Expires=")).split("=")[1];
    }
}

export default JwtTokenParser;