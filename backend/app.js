const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req, res, next) => {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*")
  next();
})

app.post('/api/posts' , (req, res, next) =>{
      const body = req.body;
      console.log(body);
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
