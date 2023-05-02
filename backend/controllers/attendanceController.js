const Attendance = require('../models/attendanceModel');
const asyncHandler = require("express-async-handler");

// Fetch employee name by id
const getEmployeeNameById =  asyncHandler (async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ employeeId: req.params.id })
      .populate('employeeId', 'name');
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.json({ name: attendance.employeeId.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Mark attendance
const markAttendance = asyncHandler (async (req, res) => {
  try {
    const { employeeId, isPresent, date } = req.body;
    // console.log("body is ", req.body)
    const data = await Attendance.findOne({employeeId,date})
    if(data){
      updateEmployeeProfile(req,res);
      return res.status(200).json({msg:"already present"})
    }
    const attendance = new Attendance({ employeeId, isPresent });
    await attendance.save();
    res.json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Mark attendance
const updateEmployeeProfile = asyncHandler(async(req,res)=>{
     try{
          const data = await Attendance.findOneAndUpdate({employeeId:req.body.employeeId},{
            $set:{
              isPresent:req.body.isPresent
            }
          })
     }
     catch(error){
        console.log("Attendence has been marked" ,error.message)
        res.status(500).json({msg:error.message})
     }
})

//get attendance
const getAttendance = asyncHandler(async(req,res) => {
  const employeeId = req.params.id;
  const attendance = await Attendance.findOne({employeeId: employeeId});
  if (attendance) {
    // res.status(200).json(attendance);
    const {_id,employeeId,date,isPresent} = attendance;
    res.status(200).json({
      _id,employeeId,date,isPresent,
    });
  } else {
    res.status(400)
    throw new Error("attendance not found")
  }  
})


module.exports = {
  markAttendance,
  getEmployeeNameById,
  getAttendance
};
