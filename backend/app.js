const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/postModel');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

// mongodb+srv://post-application-DB:9870228146@meanstackapp-x1a5a.mongodb.net/node-angular?retryWrites=true&w=majority
// 'mongodb://localhost/meanstackapp'
mongoose.connect('mongodb://localhost/meanstackapp')
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((error) => {
      throw error;
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*")
  next();
})

//
app.use("/api/posts", postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
