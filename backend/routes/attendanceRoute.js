const express = require("express");
const { markAttendance,getAttendance } = require("../controllers/attendanceController");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();

router.post("/",protect, markAttendance);
router.get('/:id',getAttendance)


module.exports = router;