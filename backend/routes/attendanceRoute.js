const express = require("express");
const { markAttendance } = require("../controllers/attendanceController");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();

router.post("/:id",protect, markAttendance);


module.exports = router;