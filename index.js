const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = () => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
    res.send({});
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return (comment.id = id);
    });

    comment.status = status;
    comment.content = content;
  }
};
posts ===
  {
    j123j42: {
      id: "j123j42",
      title: "post title",
      comments: [
        {
          id: "klj3kl",
          content: "comment!",
        },
      ],
    },
  };

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.get("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening to 4002");
  const res = await axios.get('http://localhost:4005/events');
  for(let event of res.data){
    console.log('Processing event: ',event.type);
    handleEvent(event.type,event.data);

  }
});
