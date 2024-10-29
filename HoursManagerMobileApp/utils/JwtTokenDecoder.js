/** Decode JWT Tokens */
import { jwtDecode } from "jwt-decode";

class JwtTokenDecoder
{
    static decodeJwt(token, errorRslv)
    {
        try
        {
            const decodedData = jwtDecode(token);
            return decodedData;
        }

        catch(error)
        {
            errorRslv("Could not decode JWT");
            return null;
        }
    }
}

export default JwtTokenDecoder;