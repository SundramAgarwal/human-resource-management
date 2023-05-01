import React, { useEffect, useState } from 'react'
import Attendance from '../../components/attendance/Attendance'
import useRedirectLoggedOutAdmin from '../../customHook/useRedirectLoggedOutAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/features/employee/employeeSlice';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useNavigate } from "react-router-dom";

const initialState = {
  isPresent: false,
}

const MarkAttendance = () => {
  useRedirectLoggedOutAdmin("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [attendance, setAttendance] = useState(initialState)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {employees,
         isLoading,
         isError,
         message
        } = useSelector((state) => state.employee)

  const { isPresent } = attendance;

  const handleAttendanceChange = (e) => {
    const { name, value } = e.target; 
    setAttendance({ ...attendance, [name]: value });
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getEmployees())
    }
    if (isError) {
      console.log(message)
    }
  },[isLoggedIn, isError, message, dispatch])

  const saveAttendance = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("isPresent",isPresent)

    console.log(...formData)

    // await dispatch(createAttendance(formData));
    navigate("/dashboard")
  }

  return (
    <Attendance 
      attendance = {attendance}
      employees = {employees} 
      isLoading={isLoading}
      handleAttendanceChange={handleAttendanceChange}
      saveAttendance={saveAttendance}
      />
  )
}

export default MarkAttendance