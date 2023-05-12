import React, { useState } from 'react'
import { markAttendance } from '../../services/attendanceService';


const AttendanceCard = ({_id, first_name, last_name, index }) => {

  const shortenText = (text, n) => { 
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText
    }
    return text
  };
  const today = new Date();
      const date = today.toLocaleDateString("en-US", { 
        timeZone: 'Asia/Kolkata',
        day: "numeric",
        month: "short",
        year: "numeric"
      });

  const [isPresent, setIsPresent]= useState("");


  const handleAttendanceChange=async(e)=>{
            setIsPresent(e.target.value);
            // console.log("is present is ",isPresent)
            // console.log("attendance ",e.target.value)
            await markAttendance({employeeId:_id,isPresent:e.target.value,date:date});
  }
 
      return (
        <tr key = {_id}>
          <td>{index + 1}</td>
          <td>{shortenText(first_name + " " + last_name, 20)}</td> 
          <td>
            <label>Present</label> &nbsp;
            <input  
              type="radio"  
              name={_id}
              value="true"
              onChange={handleAttendanceChange}
            /> &nbsp;
            <label>Absent</label> &nbsp;
            <input  
              type="radio" 
              name={_id}
              value="false" 
              // value ka matlb yeh hota hai ki backend me kya cheej save honi hai
              onChange={handleAttendanceChange}
            />
          </td> 
        </tr>
      )
    }

export default AttendanceCard;