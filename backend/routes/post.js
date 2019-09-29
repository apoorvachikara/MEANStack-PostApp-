const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/postModel');
const checkAuth = require('../middleware/check-auth');

const MIME_Type_Map = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}

const storingFile = multer.diskStorage({
  destination: (req, file, cb) =>{
    console.log(file);
    let isValid = MIME_Type_Map[file['mimetype']];
    let error = new Error("Invalid MimeType");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const fileName = file['originalname'].toLowerCase().split(' ').join('-');
    const extention = MIME_Type_Map[file['mimetype']];
    cb(null, fileName + '-' + Date.now() +'.' + extention );
  }
});

router.post('', checkAuth, multer({storage : storingFile}).single("image") , (req, res, next) =>{
    const URL = req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagepath: URL + '/images/' + req.file.filename,
      creator: req.userData.userId
    });
    post.save()
      .then(addedDocument => {
        res.status(201).json({
          message : "Post added Successfully",
          post : {
            ...addedDocument,
            _id: addedDocument._id,
          }
        })
      })
      .catch(error => {
          console.log(error);
      })

})

router.get('', (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const pageQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage) {
    pageQuery
          .skip(pageSize * (currentPage - 1))
          .limit(pageSize);
  }
  pageQuery
        .then( document => {
          fetchedPosts = document;
          return Post.count()
        })
        .then( count => {
          res.status(200).json({
            message: 'Posts fetched Successful',
            posts: fetchedPosts,
            count: count
            })
        })
});

router.get('/:id', (req, res, next) => {
  Post.find({ _id: req.params.id})
    .then(documents => {
          res.status(200).json({
            message : 'All post fetch Successful',
            posts : documents
            })
    })
    .catch( error => {
      console.log();
      }
    )
})

router.put('/:id', checkAuth, multer({ storage: storingFile}).single('image'), (req, res, next) => {
  let imagepath;
  imagepath = req.imagePath;
  if(req.file){
    imagepath = req.protocol + '://' + req.get('host');
    imagepath += '/images/' + req.file.filename;
  }
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagepath: imagepath,
    creator: req.userData.userId
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
      .then((updatedDocument) => {
        if(updatedDocument.nModified > 0) {
          res.status(200).json({
            message : 'Posts edited Successfully',
            posts : updatedDocument
          });
        }
        else {
          res.status(401).json({
            message: 'Unauthorized Access'
          })
        }
      })
      .catch(error => console.log(error));
});


router.delete('/:id', checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId})
      .then((document)=> {
        if (document.n > 0) {
          res.status(200).json({
            message : "Post Deleted Successfully"
          })
        }
        else {
          res.status(401).json({
            message : "Unauthorized Access"
          })
        }

      })
      .catch((error) =>{
          console.log(error);
      });
})

module.exports = router;
