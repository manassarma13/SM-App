import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentForm.css';

const CommentForm = ({ postId, token }) => {
    const [commentText, setCommentText] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Using the token passed as a prop
                    },
                };
                const { data } = await axios.get('/api/profile', config);
                setUserId(data._id);
                setUsername(data.username); // Store the username in state
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [token]); // Depend on token to refetch if token changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`/api/posts/${postId}/comments`, {
                text: commentText,
                userId: userId,
                username: username, // Send the username with the comment
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
