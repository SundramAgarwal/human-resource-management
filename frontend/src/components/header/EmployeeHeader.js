import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectEmployeeName, SET_EMPLOYEE_LOGIN } from "../../redux/features/employee/employeeAuthSlice";
import { logoutEmployee } from "../../redux/features/employee/employeeAuthServices";

const EmployeeHeader = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const full_name = useSelector(selectEmployeeName);

  const logout = async () => { 
    await logoutEmployee();
    await dispatch(SET_EMPLOYEE_LOGIN(false));
    navigate("/employeelogin");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{full_name}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default EmployeeHeader;