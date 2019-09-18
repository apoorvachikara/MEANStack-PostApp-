const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/postModel');

const postRoutes = require('./routes/post');

// mongodb+srv://post-application-DB:9870228146@meanstackapp-x1a5a.mongodb.net/node-angular?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost/meanstackapp')
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

// 
app.use("/api/posts", postRoutes);

module.exports = app;
