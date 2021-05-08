const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const list = (req, res) => {
  User.find({}, (err, data) => {
    if (err) return res.send(err);
    return res.send(data);
  });
};

const getUserById = (req, res) => {
  User.findOne({ _id: req.query.userId }, (err, data) => {
    if (err) return res.send(err);
    return res.send(data);
  });
};

const login = (req, res, next) => {
  const email = req.body && req.body.email;
  const password = req.body && req.body.password;

  if (!email) {
    return res.send("invalid email");
  }

  if (!password) {
    return res.send("invalid password");
  }

  User.findOne({ email }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (_.isEmpty(data)) {
      return res.status(400).send("no records found");
    }

    if (!bcrypt.compareSync(password, data.password)) {
      return res.status(400).send("invalid password");
    }

    const payload = {
      currentUser: email,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    res.cookie("auth_token", token);
    return res.send({
      message: "LOGIN_SUCCESS",
      user: data,
    });
  });
};

const logout = (req, res) => {
  res.clearCookie("auth_token");
  res.sendStatus(200);
};

const signup = (req, res) => {
  const saltRounds = process.env.SALT;
  //   console.log("salt", process.env.SALT, typeof saltRounds);
  //   const salt =  bcrypt.genSaltSync(saltRounds);

  const email = req.body && req.body.email;
  let password = req.body && req.body.password;
  const role = req.body && req.body.role;
  if (!email) {
    return res.status(400).send("email cant be empty");
  }

  if (!password) {
    return res.status(400).send("password cant be empty");
  }
  password = bcrypt.hashSync(password, parseInt(saltRounds));

  if (!role) {
    return res.status(400).send("role cant be empty");
  }
  User.create(
    {
      email,
      password,
      role,
    },
    (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(`${role} account created successfully`);
    }
  );
};

const update = (req, res) => {
  const user = req.context.get("user");
  const userId = user._id;
  if (!userId) {
    return res.status(400).send("userId cant be empty");
  }
  User.findOne({ _id: userId }, (err, data) => {
    if (err) return res.status(400).send(err);
    if (_.isEmpty(data)) res.status(400).send("User not found");
    const oldRecord = JSON.parse(JSON.stringify(data));
    const newRecord = _.merge(oldRecord, req.body);
    User.update({ _id: userId }, newRecord, (err1, resp) => {
      if (err1) return res.status(400).send(err1);
      return res.status(200).send(`User account updated successfully`);
    });
  });
};

module.exports = {
  list,
  login,
  logout,
  signup,
  update,
  getUserById,
};
