import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutAdmin from "../../../customHook/useRedirectLoggedOutAdmin";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEmployee } from "../../../redux/features/employee/employeeSlice";
import { SpinnerImg } from "../../loader/Loader";
import "./EmployeeAttendance.scss";

const EmployeeAttendance = () => {

    useRedirectLoggedOutAdmin("/login");
    const dispatch = useDispatch();
    const { id } = useParams();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { employee, isLoading, isError, message } = useSelector(
        (state) => state.employee
      );

    useEffect(() => {
      if (isLoggedIn === true) {
        dispatch(getEmployee(id));
      }
      if (isError) {
        console.log(message);
      }
    }, [isLoggedIn, isError, message, dispatch,id]);

  return (
    <div className="product-detail">
      <h1 className="--mt">Attendance</h1>
      
        {isLoading && <SpinnerImg />}
        {employee && (
          <div className="detail">
          <h2>Employee Name: &nbsp; {employee.first_name} {employee.last_name}</h2> 
          </div>
        )}
    </div>
  )
}

export default EmployeeAttendance