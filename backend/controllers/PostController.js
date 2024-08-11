const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    console.log("Received createPost request");
    const { text = "", userId = "" } = req.body;

    try {
        const newPost = await Post.create({ text, user: userId });
        req.io.emit('newPost', newPost);
        res.status(201).json(newPost);

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getPosts = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    try {
        const count = await Post.countDocuments();
        const posts = await Post.find()
            .populate('user', 'username')
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ posts, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.createComment = async (req, res) => {
    const { text, userId } = req.body;

    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            const comment = {
                text,
                user: userId,
            };

            post.comments.push(comment);
            
            await post.save();
            req.io.emit('newComment', { postId: req.params.id, comment });

            res.status(201).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};