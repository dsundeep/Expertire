const express = require("express");
const router = express.Router();
const {
  createRequest,
  getByInstituteId,
  getByPostId,
  getByExpertId,
  getUnreadRequests,
  deleteRequest,
} = require("../controllers/request.controller");

router.post("/", createRequest);
router.get("/getByInstitute", getByInstituteId);
router.get("/getByPost", getByPostId);
router.get("/getByExpert", getByExpertId);
router.get("/notifyInstitute", getUnreadRequests);
router.get("/delete", deleteRequest);

module.exports = router;
