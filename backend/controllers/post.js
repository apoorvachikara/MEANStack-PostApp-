
const Post = require('../models/postModel');

exports.createPost = (req, res, next) =>{
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
          res.status(500).json({
            message: 'Post is not Created!'
          })
      })

}

exports.getPost = (req, res, next) => {
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
  }


  exports.getOnepost = (req, res, next) => {
    Post.find({ _id: req.params.id})
      .then(documents => {
            res.status(200).json({
              message : 'All post fetch Successful',
              posts : documents
              })
      })
      .catch( error => {
          res.status(500).json({
            message: 'Post Fetch failed'
          })
        }
      )
  }


  exports.updateOnePost = (req, res, next) => {
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
          if(updatedDocument.n > 0) {
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
        .catch( error => {
          res.status(500).json({
          message: 'Update Failed'
        })});
  }

  exports.deletOne = (req, res, next) => {
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
          res.status(500).json({
            message : "Delete Failed"
          })
        });
  }