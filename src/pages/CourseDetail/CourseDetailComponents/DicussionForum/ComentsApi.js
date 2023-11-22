import { commonrequest } from '../../../../services/ApiCall';
import Cookies from "js-cookie";
const token = Cookies.get('token');

const API = "http://localhost:8000";
export const createComment = async (courseId, usertype, data) => {
    try {
        const response = await commonrequest("POST", `${API}/${usertype}/${courseId}/discussion`, data, {
            'authorization': `Bearer ${token}`
        });
        return response;
    }
    catch {
        throw new Error("Error in creating comment")
    }
};


export const updateComment = async (courseId, commentId, usertype, data) => {
    try {
        const response = await commonrequest("PATCH", `${API}/${usertype}/${courseId}/discussion/${commentId}`, data, {
            'authorization': `Bearer ${token}`
        });
        return response;
    }
    catch {
        throw new Error("Error in updating comment")
    }
};

export const deleteComment = async (courseId, commentId, usertype) => {
    if (window.confirm("Are you sure you want to remove this comment?")) {
        try {
            const response = await commonrequest("DELETE", `${API}/${usertype}/${courseId}/discussion/${commentId}`, {}, {
                'authorization': `Bearer ${token}`
            });
            return response;
        }
        catch {
            throw new Error("Error in deleting comment")
        }
    }
};

// extra
export const sentOtpFunction = async (data) => {
    return await commonrequest("POST", `${API}/user/sendotp`, data)
}