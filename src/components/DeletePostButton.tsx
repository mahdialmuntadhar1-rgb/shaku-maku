import React from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { postsApi } from '../api';

interface DeletePostButtonProps {
  postId: number;
  onDelete: (postId: number) => void;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId, onDelete }) => {
  const { isAdmin, loading } = useAdmin();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postsApi.delete(postId);
      onDelete(postId);
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (loading || !isAdmin) {
    return null;
  }

  return (
    <button
      onClick={handleDelete}
      className="delete-post-btn"
      style={{
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
    >
      Delete
    </button>
  );
};

export default DeletePostButton;
