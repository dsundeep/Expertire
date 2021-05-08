const Request = require("../models/postRequest.model");
const Post = require("../models/institutePost.model");
const User = require("../models/user.model");
const Promise = require("bluebird");

const createRequest = (req, res) => {
  const user = req.context.get("user");
  if (user.role === "institute") return res.send("Permissions Denied");
  const currentExpertId = user && user._id;
  const instituteId = req.body && req.body.instituteId;
  const postId = req.body && req.body.postId;
  const status = "pending";
  Request.create(
    { expertId: currentExpertId, instituteId, postId, status },
    (err, data) => {
      if (err) return res.send(err);
      return res.send("inserted successfully");
    }
  );
};

const getByInstituteId = (req, res) => {
  const instituteId = req.query && req.query.instituteId;
  Request.find({ instituteId }, (err, requests) => {
    if (err) return res.send(err);
    const data = JSON.parse(JSON.stringify(requests));
    Promise.mapSeries(
      data,
      (item, index) =>
        new Promise((resolve, reject) => {
          Post.findOne({ _id: item.postId }, (err, post) => {
            if (err) return reject(err);
            data[index].post = post;
            User.findOne({ _id: item.instituteId }, (err1, institute) => {
              if (err1) return reject(err1);
              data[index].institute = institute;
              User.findOne({ _id: item.expertId }, (err2, expert) => {
                if (err2) return reject(err2);
                data[index].expert = expert;
                return resolve();
              });
            });
          });
        })
    )
      .then(() => {
        return res.send(data);
      })
      .catch((e) => res.send(err));
  });
};

const getByExpertId = (req, res) => {
  const expertId = req.query && req.query.expertId;
  Request.find({ expertId }, (err, requests) => {
    if (err) return res.send(err);
    const data = JSON.parse(JSON.stringify(requests));
    Promise.mapSeries(
      data,
      (item, index) =>
        new Promise((resolve, reject) => {
          Post.findOne({ _id: item.postId }, (err, post) => {
            if (err) return reject(err);
            data[index].post = post;
            User.findOne({ _id: item.instituteId }, (err1, institute) => {
              if (err1) return reject(err1);
              data[index].institute = institute;
              User.findOne({ _id: item.expertId }, (err2, expert) => {
                if (err2) return reject(err2);
                data[index].expert = expert;
                return resolve();
              });
            });
          });
        })
    )
      .then(() => {
        return res.send(data);
      })
      .catch((e) => res.send(err));
  });
};

const getByPostId = (req, res) => {
  const postId = req.query && req.query.postId;
  Request.find({ postId }, (err, requests) => {
    if (err) return res.send(err);
    const data = JSON.parse(JSON.stringify(requests));
    Promise.mapSeries(
      data,
      (item, index) =>
        new Promise((resolve, reject) => {
          Post.findOne({ _id: item.postId }, (err, post) => {
            if (err) return reject(err);
            data[index].post = post;
            User.findOne({ _id: item.instituteId }, (err1, institute) => {
              if (err1) return reject(err1);
              data[index].institute = institute;
              User.findOne({ _id: item.expertId }, (err2, expert) => {
                if (err2) return reject(err2);
                data[index].expert = expert;
                return resolve();
              });
            });
          });
        })
    )
      .then(() => {
        return res.send(data);
      })
      .catch((e) => res.send(err));
  });
};

const getUnreadRequests = (req, res) => {
  const user = req.context.get("user");
  const instituteId = user && user._id;
  Request.find({ isRead: "f", instituteId }, (err, requests) => {
    if (err) return res.send(err);
    const data = JSON.parse(JSON.stringify(requests));
    Promise.mapSeries(
      data,
      (item, index) =>
        new Promise((resolve, reject) => {
          Post.findOne({ _id: item.postId }, (err, post) => {
            if (err) return reject(err);
            data[index].post = post;
            User.findOne({ _id: item.instituteId }, (err1, institute) => {
              if (err1) return reject(err1);
              data[index].institute = institute;
              User.findOne({ _id: item.expertId }, (err2, expert) => {
                if (err2) return reject(err2);
                data[index].expert = expert;
                return resolve();
              });
            });
          });
        })
    )
      .then(() => {
        return res.send(data);
      })
      .catch((e) => res.send(err));
  });
};
const deleteRequest = (req, res) => {
  const requestId = req.query && req.query.requestId;
  Request.deleteOne({ _id: requestId }, (err, requests) => {
    if (err) return res.send(err);
    return res.send("deleted successfully");
  });
};

module.exports = {
  createRequest,
  getByInstituteId,
  getByPostId,
  getByExpertId,
  getUnreadRequests,
  deleteRequest,
};
