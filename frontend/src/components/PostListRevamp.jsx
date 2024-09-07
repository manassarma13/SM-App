import React from 'react';
import socketIo from 'socket.io-client';

const PostListRevamp = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    

    // const socket = socket.io-client.connect('http://localhost:5001');

    // useEffect(() => {
    //    socket.emit("hello", "awdawdwa")
    // }, [socket]);

    // console.log("socket",socket);
return (
    <div>
        
    </div>

)
}

export default PostListRevamp;