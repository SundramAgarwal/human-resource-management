const Attendance = require('../models/attendanceModel');
const asyncHandler = require("express-async-handler");

// // Fetch employee name by id
// exports.getEmployeeNameById = async (req, res) => {
//   try {
//     const attendance = await Attendance.findOne({ employeeId: req.params.id })
//       .populate('employeeId', 'name');
//     if (!attendance) {
//       return res.status(404).json({ message: 'Attendance not found' });
//     }
//     res.json({ name: attendance.employeeId.name });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// Mark attendance
const markAttendance = asyncHandler (async (req, res) => {
  try {
    const { employeeId, isPresent } = req.body;
    const attendance = new Attendance({ employeeId, isPresent });
    await attendance.save();
    res.json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  markAttendance,
};
