const express = require("express");
const router = express.Router();
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const requestRouter = require("./routes/request.routes");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  let mytoken = req.cookies.auth_token;
  console.log(req.path);
  if (
    req.path === "/users/login" ||
    req.path === "/users/create" ||
    req.path === "/users/logout" ||
    req.path === "/login"
  )
    return next();
  if (mytoken) {
    try {
      mytoken = jwt.verify(mytoken, process.env.SECRET);
    } catch (e) {
      res.clearCookie("auth_token");
      return res.redirect("/anon");
    }
    User.findOne({ email: mytoken.currentUser }, (err, user) => {
      if (err) return res.send("unable to fetch user");
      if (user && user.email) {
        req.context.set("user", JSON.parse(JSON.stringify(user)));
        console.log("dsssd");
        return next();
      } else {
        return res.redirect("/anon");
      }
    });
  } else {
    res.clearCookie("auth_token");
    return res.redirect("/anon");
  }
});

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/request", requestRouter);

module.exports = router;
