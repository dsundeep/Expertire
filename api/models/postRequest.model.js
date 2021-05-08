const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  expertId: {
    type: "String",
    trim: true,
  },
  instituteId: {
    type: "String",
    trim: true,
  },
  isRead: {
    type: "String",
    trim: true,
    default: "f",
  },
  postId: {
    type: "String",
    required: true,
    trim: true,
  },
  userId: {
    type: "String",
    trim: true,
  },
  status: {
    type: "String",
    trim: true,
  },
});

module.exports = mongoose.model("postRequest", requestSchema, "postRequest");
