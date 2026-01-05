import type { Comment } from '../types/comment';

const BASE_URL = 'http://localhost:5000/api';
const token = () => localStorage.getItem('token');

export const getCommentsByProductId = async (productId: string): Promise<Comment[]> => {
  const res = await fetch(`${BASE_URL}/products/${productId}/comments`);

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to load comments');

  return result;
};

export const createComment = async (productId: string, text: string): Promise<Comment> => {
  const res = await fetch(`${BASE_URL}/products/${productId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ text }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to create comment');

  return result;
};

export const updateComment = async (commentId: string, text: string): Promise<Comment> => {
  const res = await fetch(`${BASE_URL}/products/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ text }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to update comment');
  return result;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/products/comments/${commentId}`,  {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) {
    const result = await res.json().catch(() => ({}));
    throw new Error(result.message || 'Failed to delete comment');
  }
};
