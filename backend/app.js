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
      post.save();
      res.status(201).json({
        message : "Post added Successfully"
      })
})

app.get('/api/posts', (req, res, next) => {
        const posts = [
          {
            id : '9882739',
            title : 'Title 1',
            content : 'Content 1'
          },
          {
            id : '9882740',
            title : 'Title 2',
            content : 'Content 2'
          }
        ]

        res.status(200).json({
          message : 'Posts fetched Successfully',
          posts : posts
        });
});

module.exports = app;
