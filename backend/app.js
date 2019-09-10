const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/postModel');

mongoose.connect('mongodb+srv://post-application-DB:9870228146@meanstackapp-x1a5a.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((error) => {
      throw error;
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req, res, next) => {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*")
  next();
})

app.post('/api/posts' , (req, res, next) =>{
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

app.get('/api/posts', (req, res, next) => {

    Post.find()
          .then(documents => {

            res.status(200).json({
              message : 'Posts fetched Successfully',
              posts : documents
            });
          })

});

app.put('/api/posts/:id', (req, res, next) => {
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


app.delete('/api/posts/:id', (req, res, next) => {
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

module.exports = app;
