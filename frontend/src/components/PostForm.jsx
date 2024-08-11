import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5001/api/posts', { text, userId: '66b8bd5d8f14da8fc2d3f01e' });
        setText('');
    };

    return (
        <div className="post-form">
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's on your mind?"
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default PostForm;
