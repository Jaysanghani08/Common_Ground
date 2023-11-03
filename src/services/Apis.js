import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";
import Cookies from "js-cookie"

const BASE_URL2 = "https://65435b7a01b5e279de203893.mockapi.io/"

const token = Cookies.get('token')
// console.log(`Bearer ${token}`)

// public pages
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
    return await commonrequest("POST", `${BACKEND_URL}/educator/signup`, data, {
        'Content-Type': 'multipart/form-data'
    })

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

// private poges

// Educator

export const educreatecoursefunction = async (data) => {
    console.log(data)
    return await commonrequest("POST", `${BACKEND_URL}/educator/create-course`, data, {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    })
}

export const getEducatorDashboard = async (data) => {
    // console.log(data)
    try {
        // console.log(data);
        const response = await commonrequest("GET", `${BACKEND_URL}/query/dashboard`, data, {
            'authorization': `Bearer ${token}`
        });
        // console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
}

export const getEducatorProfile = async () => {
    // console.log(data)
    try {
        // console.log(data);
        const response = await commonrequest("GET", `${BACKEND_URL}/query/profile`, {}, {
            'authorization': `Bearer ${token}`
        });
        return response.data.educator;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
}

export const getEducatorcourses = async () => {
    // console.log(data)
    try {
        // console.log(data);
        const response = await commonrequest("GET", `${BACKEND_URL}/query/coursebyeducator`, {}, {
            'authorization': `Bearer ${token}`
        });
        return response.data.courses;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
}

export const getIncome = async (data) => {
    // console.log(data)
    try {
        // console.log(data);
        const response = await commonrequest("GET", `${BACKEND_URL}/query/dashboard`, data, {
            'authorization': `Bearer ${token}`
        });
        return response.data;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
}


export const getAllCourses = async (data) => {
    // console.log(data)
    try {
        // console.log(data);
        const response = await commonrequest("GET", `${BASE_URL2}/user/edu-earning`, data, {
            'authorization': `Bearer ${token}`
        });
        // console.log(response.data[0].earning)
        return response.data[0].earning;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
}


// Student

export const getStudentDashboard = async (data) => {
    // console.log(data)
    try {
        // console.log(data);
        const response = await commonrequest("GET", `${BACKEND_URL}/query/enrolled-course`, data, {
            'authorization': `Bearer ${token}`
        });
        // console.log(response.data)
        return response.data ? response.data.courses : null;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
}

export const getStudentProfile = async () => {
    // console.log(data)
    try {
        // console.log(data);
        const response = await commonrequest("GET", `${BACKEND_URL}/query/profile`, {}, {
            'authorization': `Bearer ${token}`
        });
        return response.data.student;
    } catch (error) {
        throw new Error("Error fetching user data");
    }
}




// extra
export const sentOtpFunction = async (data) => {
    return await commonrequest("POST", `${BACKEND_URL}/user/sendotp`, data)
}