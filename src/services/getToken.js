import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const getToken = (usertype) => {

    const token = Cookies.get('token');
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdXJhYmhfdGl3YXJpX3Rlc3RAZ21haWwuY29tIiwidXNlcklkIjoiNjU0YTQyZTRmYzY3ZDM5NTg0MzNkYzZjIiwidXNlclR5cGUiOiJlZHVjYXRvciIsImlhdCI6MTY5OTM3NTkxNSwiZXhwIjoxNzAxOTY3OTE1fQ.x7xeWBW5KOW-DeesIYA0156RmbT5ROufSrokjWC12O0"

    if (!token) return "";
    const decodedToken = jwtDecode(token);
    
    if (decodedToken.userType !== usertype) return "";
    // //console.log(decodedToken)

    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return "";
    } else {
        return decodedToken;
    }

    // return decodedToken

}

export default getToken
