import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentForm.css';

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
                    },
                };
                const { data } = await axios.get('/api/profile', config);
                setUserId(data._id);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`/api/posts/${postId}/comments`, {
                text: commentText,
                userId: userId,
            });
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment here..."
                rows="4"
                required
            />
            <button type="submit" disabled={!userId}>Submit</button>
        </form>
    );
};

export default CommentForm;
