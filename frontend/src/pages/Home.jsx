import React from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

console.log("Hello From Home")
const Home = () => {
    return (
        <div className="home">
            {/* <h1>Test</h1> */}
            <PostForm />
            <PostList />
        </div>
    );
};

export default Home;
