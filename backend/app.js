const express = require('express');
const app = express();

app.use('/api/posts', (req, res, next) => {
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
