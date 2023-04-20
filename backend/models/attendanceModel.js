const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  isPresent: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;