import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Search from "../../search/Search";
import useRedirectLoggedOutAdmin from "../../../customHook/useRedirectLoggedOutAdmin";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEmployee } from "../../../redux/features/employee/employeeSlice";
import { SpinnerImg } from "../../loader/Loader";
import "./EmployeeAttendance.scss";
import axios from "axios";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const EmployeeAttendance = () => {
  useRedirectLoggedOutAdmin("/login");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
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
    axios
      .get(`${BACKEND_URL}/api/attendance/getAttendance/${id}`)
      .then((response) => {
        setAttendanceRecords(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLoggedIn, isError, message, dispatch, id]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString("en-IN", options);
  };

  const filteredAttendanceRecords = attendanceRecords
    .filter((record) => {
      const createdAtDate = new Date(record.createdAt).toLocaleDateString();
      return createdAtDate.includes(search);
    })
    .reverse();

  return (
    <div className="product-list">
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h1>Attendance</h1>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}
        <div className="table">
          {employee && (
            <h2>
              Employee Name: &nbsp; {employee.first_name} {employee.last_name}
            </h2>
          )}
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Date</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendanceRecords.map((attendance, index) => (
                <tr key={attendance._id}>
                  <td>{index + 1}</td>
                  <td>{formatDate(attendance.createdAt)}</td>
                  <td>{`${formatDate(attendance.createdAt)} - ${formatTime(
                    attendance.createdAt
                  )}`}</td>
                  <td>{`${formatDate(attendance.updatedAt)} - ${formatTime(
                    attendance.updatedAt
                  )}`}</td>
                  <td>{attendance.isPresent ? "Present" : "Absent"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
