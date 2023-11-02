import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const getToken = (usertype) => {

    const token = Cookies.get('token');

    if (!token) return "";
    const decodedToken = jwtDecode(token);
    
    if (decodedToken.userType !== usertype) return "";
    // console.log(decodedToken)

    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return "";
    } else {
        return decodedToken;
    }

    // return decodedToken

}

export default getToken
