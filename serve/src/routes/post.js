const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const postController  = require('../controllers/postController')
const uploadConfig = require('../config/file')

// post
router.get('', auth ,postController.getAllPost )
router.post('/create', uploadConfig.single('file') ,postController.addPost)
router.delete('/:id',auth, postController.deletePost);
router.get('/:id',auth, postController.findOnePost);
router.patch('/update/:id', uploadConfig.single('file') , postController.updatePost);


// tag
router.get('/tag/list', auth , postController.getAllTag)
router.post('/tag/create', auth , postController.addPostTag)
router.patch('/tag/update/:id', auth , postController.updateTag)
router.delete('/tag/:id', auth , postController.deleteTag)

module.exports = router;