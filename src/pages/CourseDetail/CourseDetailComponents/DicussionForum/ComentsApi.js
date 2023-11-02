const API_BASE_URL = "http://localhost:3000/comments";

export const getComments = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

export const createComment = async (text,userId, username) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      body: text,
      userId, // user ID
      username, // username
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create a comment');
  }
  return response.json();
};

export const updateComment = async (text, commentId) => {
  const response = await fetch(`${API_BASE_URL}/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to update the comment');
  }
  return response.json();
};

export const deleteComment = async (commentId) => {
  const response = await fetch(`${API_BASE_URL}/${commentId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete the comment');
  }
};
