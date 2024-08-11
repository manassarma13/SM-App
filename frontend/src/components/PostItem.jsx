import React, { useState } from 'react';
import CommentForm from './CommentForm';
import './PostItem.css'; 

const getRandomColor = () => {
    const colors = ['#FFB6C1', '#FF6347', '#FFD700', '#90EE90', '#ADD8E6'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar = ({ username }) => {
    const initial = username ? username.charAt(0).toUpperCase() : '?';
    const backgroundColor = getRandomColor();
    
    return (
        <div className="avatar" style={{ backgroundColor }}>
            {initial}
        </div>
    );
};

const PostItem = ({ post }) => {
    const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
    
    const toggleCommentForm = () => {
        setIsCommentFormVisible(prev => !prev);
    };

    const postText = post.text || "",
        user = post.user || {},
        username = user.username || "Unknown User";

    return (
        <div className="post-item">
            <Avatar username={username} />
            <div className="post-content">
                <p>{postText}</p>
                <small>Posted by: {username}</small>
                <div className="comments-section">
                    {post?.comments.map(comment => (
                        <div key={comment._id} className="comment">
                            <p>{comment.text}</p>
                            <small>Commented by User ID: {comment.user}</small>
                        </div>
                    ))}
                </div>
                <button 
                    className="toggle-comment-form-button" 
                    onClick={toggleCommentForm}
                >
                    {isCommentFormVisible ? 'Hide Comment Form' : 'Add a Comment'}
                </button>
                {isCommentFormVisible && <CommentForm postId={post._id} />}
            </div>
        </div>
    );
};

export default PostItem;
