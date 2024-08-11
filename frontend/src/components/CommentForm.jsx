import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(`/api/posts/${postId}/comments`, {
                text: commentText,
                userId: 'YOUR_USER_ID', // Replace with actual user ID
            });
            setCommentText(''); // Clear the input field
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
