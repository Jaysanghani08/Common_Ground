// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let comments = [
  {
    id: "1",
    body: "First comment",
    username: "Ankur",
    userId: "1",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  // Add more comments here
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { body, parentId, userId, username, createdAt } = req.body;
  const newComment = {
    id: Math.random().toString(36).substr(2, 9),
    body,
    parentId,
    userId,
    username,
    createdAt,
  };
  comments.push(newComment);
  res.json(newComment);
});

app.put('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const updatedText = req.body.text;
  const commentIndex = comments.findIndex((comment) => comment.id === commentId);
  if (commentIndex !== -1) {
    comments[commentIndex].body = updatedText;
    res.json(comments[commentIndex]);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.delete('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const commentIndex = comments.findIndex((comment) => comment.id === commentId);
  if (commentIndex !== -1) {
    comments.splice(commentIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
