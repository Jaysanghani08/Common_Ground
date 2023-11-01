import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

//student
export const studentregisterfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/student/signup`, data)
}

export const studentloginfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/student/login`, data)
}

export const studentresetpasswordfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/student/reset-password`, data)
}

export const studentupdatepasswordfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/student/update-password`, data)
}

// export const studentdeletefunction = async(data)=>{
//     console.log(data)
//     return await commonrequest("POST",`${BACKEND_URL}/student/delete`,data)
// }

// educator
export const eduregisterfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/educator/signup`, data)
}

export const eduloginfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/educator/login`, data)
}

export const eduresetpasswordfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/educator/reset-password`, data)
}

export const eduupdatepasswordfunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/educator/update-password`, data)
}

export const educreatecoursefunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/educator/create-course`, data, {
            'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdXJhYmhfdGl3YXJpX3Rlc3RAZ21haWwuY29tIiwidXNlcklkIjoiNjU0MGQxYWM4YWY1Zjc3Yzg5Mjc4YjM5IiwidXNlclR5cGUiOiJlZHVjYXRvciIsImlhdCI6MTY5ODc0NjgwMSwiZXhwIjoxNzAxMzM4ODAxfQ.v6HJ9KKTLIe58CPNC2uFKPvrHwlLPAhOtcXW8Ud46_g`,
            'Content-Type' : 'multipart/form-data'
    })
}




// extra
export const sentOtpFunction = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/sendotp`, data)
}

export const userVerify = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/login`, data)
}