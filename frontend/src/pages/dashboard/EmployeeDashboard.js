import React, { useEffect, useState } from "react";
import "./EmployeeProfile.scss";
import useRedirectLoggedOutEmployee from "../../customHook/useRedirectLoggedOutEmployee";
import { useDispatch } from "react-redux";
import { getEmployeeItself } from "../../redux/features/employee/employeeAuthServices";
import {
  SET_EMPLOYEE,
  SET_EMPLOYEE_NAME,
} from "../../redux/features/employee/employeeAuthSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const EmployeeDashboard = () => {
  useRedirectLoggedOutEmployee("/employeelogin");
  const dispatch = useDispatch();

  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getEmployeeData() {
      const data = await getEmployeeItself();

      setEmployeeProfile(data);
      setIsLoading(false);
      await dispatch(SET_EMPLOYEE(data));
      await dispatch(SET_EMPLOYEE_NAME(data.first_name + " " + data.last_name));
    }
    getEmployeeData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        <h1>PROFILE</h1>
        {!isLoading && employeeProfile === null ? (
          <p>Something went wrong,please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={employeeProfile?.image} alt="Profile Pic" />
            </span>
            <span className="profile-data">
              <p>
                <b>ID : </b> {employeeProfile?.employee_code}
              </p>
              <p>
                <b>Name : </b>{" "}
                {employeeProfile?.first_name + " " + employeeProfile?.last_name}
              </p>
              <p>
                <b>Email : </b> {employeeProfile?.email}
              </p>
              <p>
                <b>Contact : </b> {employeeProfile?.contact_number}
              </p>
              <p>
                <b>DOB : </b> {employeeProfile?.date_of_birth}
              </p>
              <p>
                <b>Gender : </b> {employeeProfile?.gender}
              </p>
              <p>
                <b>Blood Group : </b> {employeeProfile?.blood_group}
              </p>
              <p>
                <b>Department : </b> {employeeProfile?.department}
              </p>
              <p>
                <b>Designation : </b> {employeeProfile?.designation}
              </p>
              <p>
                <b>Role : </b> {employeeProfile?.role}
              </p>
              <p>
                <b>Classes Assigned : </b> {employeeProfile?.class_assigned}
              </p>
              <p>
                <b>Date of Joining : </b> {employeeProfile?.date_of_joining}
              </p>
              <p>
                <b>Address : </b> {employeeProfile?.address}
              </p>
              <div>
                <Link to="/employee-edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default EmployeeDashboard;
