const express = require('express');
const multer = require('multer');
const router = express.Router();

const postController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');

const extractFile = require('../middleware/fileUpload');



router.post('', checkAuth, extractFile , postController.createPost);

router.get('', postController.getPost);

router.get('/:id', postController.getOnepost)

router.put('/:id', checkAuth, extractFile, postController.updateOnePost);


router.delete('/:id',checkAuth, postController.deletOne);

module.exports = router;
