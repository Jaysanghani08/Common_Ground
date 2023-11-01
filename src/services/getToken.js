import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const getToken = () => {

    const token = Cookies.get('token');

    if(!token) return "";
    const decodedToken = jwtDecode(token);

    return decodedToken

}

export default getToken
