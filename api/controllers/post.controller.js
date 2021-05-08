const Post = require("../models/institutePost.model");
const User = require("../models/user.model");
const Promise = require("bluebird");

const fetchPost = (req, res) => {
  Post.find({ status: "active" }, (err, posts) => {
    if (err) return res.send(err);
    const data = JSON.parse(JSON.stringify(posts));
    Promise.mapSeries(
      data,
      (item, index) =>
        new Promise((resolve, reject) => {
          User.findOne({ _id: item.instituteId }, (err1, institute) => {
            if (err1) return res.send(err1);
            data[index].institute = institute;
            return resolve();
          });
        })
    )
      .then(() => {
        return res.send(data);
      })
      .catch((e) => res.send(err));
  });
};

const createPost = (req, res) => {
  const user = req.context.get("user");
  console.log(user);
  if (user.role !== "institute") return res.send("Permissions Denied");
  const currentInstituteId = user && user._id;
  const title = req.body && req.body.title;
  const message = req.body && req.body.message;
  if (!title) return res.send("enter a valid title");
  if (!message) return res.send("enter a valid message");
  Post.create(
    { instituteId: currentInstituteId, title, message, status: "active" },
    (err, data) => {
      if (err) return res.send(err);
      return res.send("inserted successfully");
    }
  );
};

const updatePost = (req, res) => {
  const user = req.context.get("user");
  if (user.role !== "institute") return res.send("Permissions Denied");
  const currentInstituteId = user && user._id;
  const postId = req.body && req.body.postId;
  const title = req.body && req.body.title;
  const message = req.body && req.body.message;
  const status = req.body && req.body.status;
  if (!postId) return res.send("enter a valid postId");
  Post.findOne({ instituteId: currentInstituteId }, (err, post) => {
    if (err) return res.send("unable to fetch and update post");
    if (!post || !post.ownerId || post.ownerId !== currentInstituteId) {
      return res.send("User cannot update post");
    }
    if (title) post.title = title;
    if (message) post.message = message;
    if (status) post.status = status;
    post.save((err1, data) => {
      if (err1) return res.send(err1);
      return res.send("updated successfully");
    });
  });
};

module.exports = {
  createPost,
  fetchPost,
  updatePost,
};
