const express = require('express');
const router  = express.Router();
const { createPost, fetchPost, updatePost } = require('../controllers/post.controller');

router.post('/createpost', createPost);

router.get('/fetch', fetchPost);

router.patch('/update', updatePost);

module.exports = router;