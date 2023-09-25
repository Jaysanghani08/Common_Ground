import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";

//student
export const studentregisterfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/student/signup`,data)
}

export const studentloginfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/student/login`,data)
}

export const studentresetpasswordfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/student/reset-password`,data)
}

export const studentupdatepasswordfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/student/update-password`,data)
}

// export const studentdeletefunction = async(data)=>{
//     console.log(data)
//     return await commonrequest("POST",`${BACKEND_URL}/student/delete`,data)
// }

// educator
export const eduregisterfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/educator/signup`,data)
}

export const eduloginfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/educator/login`,data)
}

export const eduresetpasswordfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/educator/reset-password`,data)
}

export const eduupdatepasswordfunction = async(data)=>{
    console.log(data)
    return await commonrequest("POST",`${BACKEND_URL}/educator/update-password`,data)
}




// extra
export const sentOtpFunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/sendotp`,data)
}

export const userVerify = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/user/login`,data)
}