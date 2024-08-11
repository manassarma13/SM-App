const express = require('express');
const { createPost, getPosts, createComment } = require('../controllers/PostController');
const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getPosts);
router.post('/posts/:id/comments', createComment);

module.exports = router;