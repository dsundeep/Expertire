const express = require("express");
const router = express.Router();
const {
  list,
  login,
  logout,
  signup,
  update,
  getUserById,
} = require("../controllers/user.controller");

router.get("/list", list);
router.get("/userprofile", getUserById);
router.post("/login", login);
router.get("/logout", logout);
router.post("/create", signup);
router.patch("/update", update);

module.exports = router;
