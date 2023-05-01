import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Search from '../../search/Search'
import useRedirectLoggedOutAdmin from "../../../customHook/useRedirectLoggedOutAdmin";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEmployee } from "../../../redux/features/employee/employeeSlice";
import { SpinnerImg } from "../../loader/Loader";
import "./EmployeeAttendance.scss";
// import {AiOutlineEye} from "react-icons/ai"
const EmployeeAttendance = () => {

    useRedirectLoggedOutAdmin("/login");
    const [search, setSearch] = useState("")
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
    <div className="product-list">
      <div className="table">
      <div className='--flex-between --flex-dir-column'>
          <span>
            <h1>Attendance</h1>
          </span>
          <span>
            <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
          </span>
        </div>
      
        {isLoading && <SpinnerImg />}
        <div className="table">
          {employee && (
            <h2>Employee Name: &nbsp; {employee.first_name} {employee.last_name}</h2> 
          )}
          <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>01-01-2000</td>
                  <td>Present</td>
                </tr>
              </tbody>
              
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmployeeAttendance