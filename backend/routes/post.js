const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/postModel');

const MIME_Type_Map = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}

const storingFile = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_Type_Map[file['mimetype']]; 
    const error = new Error("Invalid MimeType");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  file: (req, file, cb) => {
    const fileName = file['originalname'].toLowerCase().split(' ').join('-');
    const extention = MIME_Type_Map[file['mimetype']];
    cb(null, fileName + '-' + Date.now() +'.' + extention );
  }
}); 

router.post('', multer(storage).single("image") , (req, res, next) =>{
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save()
      .then(addedDocument => {
        res.status(201).json({
          message : "Post added Successfully",
          postID : addedDocument._id
        })
      })
      .catch(error => {
          console.log(error);
      })

})

router.get('', (req, res, next) => {

  Post.find()
        .then(documents => {

          res.status(200).json({
            message : 'Posts fetched Successfully',
            posts : documents
          });
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

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
      .then((updatedDocument) => {
          res.status(200).json({
            message : 'Posts edited Successfully',
            posts : updatedDocument
          })
      })
      .catch(error => console.log(error));
});


router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id})
      .then((document)=> {
        console.log(document);
        res.status(200).json({
          message : "Post Deleted Successfully"
        })
      })
      .catch((error) =>{
          console.log(error);
      });
})

module.exports = router;