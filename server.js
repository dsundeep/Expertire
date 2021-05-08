const express = require("express");
const context = require("express-context-store");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cp = require("cookie-parser");
const cors = require("cors");
const Promise = require("bluebird");

const app = express();
app.use(context());
dotenv.config();

const port = process.env.PORT || 8000;
const UI = process.env.build;
const allowCors =
  process.env.NODE_ENV === "dev"
    ? { credentials: true, origin: process.env.UI }
    : {};
console.log(UI, __dirname);
app.use(cors(allowCors));
app.use(cp());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(express.static(path.join(__dirname, UI)));

app.get("/anon", (req, res) => {
  res.status(400).send("not logged in");
});

app.use(require("./api"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, UI, "/index.html"));
});

const appStart = () =>
  new Promise((res, rej) => {
    app.listen(port, () => {
      console.log("App started");
      return res();
    });
  });

const mongoConnect = () =>
  new Promise((res, rej) => {
    mongoose.connect(
      process.env.DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      (err) => {
        if (err) return rej(err);
        else {
          console.log("mongodb connected");
          return res();
        }
      }
    );
  });

mongoConnect()
  .then(appStart)
  .catch((err) => console.log(err));
