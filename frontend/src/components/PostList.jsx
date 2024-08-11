import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get(`http://localhost:5001/api/posts?page=${page}`);
            // console.log(data.posts)
            setPosts(data.posts);
            setTotalPages(data.pages);
        };
        fetchPosts();
    }, [page]);

    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
            <div className="pagination">
                <button
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostList;
