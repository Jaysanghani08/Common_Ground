import { commonrequest } from '../../../../services/ApiCall'
const API= "http://localhost:8000";  

export const getComments = async (courseId) => {
  const response = await commonrequest(`${API}/educator/${courseId}/discussion`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};


export const createComment = async (courseId, text, userId, userType) => {
  const response = await commonrequest(`${API}/educator/${courseId}/discussion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: text,
      userId, // user ID
      userType, // user
      courseId,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create a comment');
  }
  return response.json();
};


export const updateComment = async (courseId, text, commentId) => {
  const response = await commonrequest(`${API}/educator/${courseId}/discussion/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: text }),
  });
  if (!response.ok) {
    throw new Error('Failed to update the comment');
  }
  return response.json();
};

export const deleteComment = async (courseId, commentId) => {
  const response = await commonrequest(`${API}/educator/${courseId}/discussion/${commentId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete the comment');
  }
};

// extra
export const sentOtpFunction = async (data) => {
  return await commonrequest("POST", `${API}/user/sendotp`, data)
}