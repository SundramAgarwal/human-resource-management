const mongoose = require('mongoose');
const today = new Date();
const date = today.toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: date
  },
  isPresent: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;