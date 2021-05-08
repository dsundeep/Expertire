const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: "String",
    trim: true,
  },
  lastName: {
    type: "String",
    trim: true,
  },
  name: {
    type: "String",
    trim: true,
  },
  password: {
    type: "String",
    required: true,
    trim: true,
  },
  email: {
    type: "String",
    required: true,
    trim: true,
  },
  role: {
    type: "String",
    trim: true,
  },
  address: {
    type: "String",
    trim: true,
  },
  city: {
    type: "String",
    trim: true,
  },
  province: {
    type: "String",
    trim: true,
  },
  country: {
    type: "String",
    trim: true,
  },
  pincode: {
    type: "String",
    trim: true,
  },
  overview: {
    type: "String",
    trim: true,
  },
  website: {
    type: "String",
    trim: true,
  },
  skills: {
    type: "String",
    trim: true,
  },
  talks: {
    type: "String",
    trim: true,
  },
  experiences: {
    type: "String",
    trim: true,
  },
  workshops: {
    type: "String",
    trim: true,
  },
  about: {
    type: "String",
    trim: true,
  },
});

module.exports = mongoose.model("user", userSchema, "user");
