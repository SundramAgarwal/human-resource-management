import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutAdmin from "../../../customHook/useRedirectLoggedOutAdmin";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEmployee } from "../../../redux/features/employee/employeeSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./EmployeeDetail.scss";
// import DOMPurify from "dompurify";

const EmployeeDetail = () => {
  useRedirectLoggedOutAdmin("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { employee, isLoading, isError, message } = useSelector(
    (state) => state.employee
  );

  const classes = (class_assigned) => {
    if (class_assigned > 7) {
      return <span className="--color-danger">No</span>;
    }
    return <span className="--color-success">Yes</span>;
  };

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
      <h3 className="--mt">Employee Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {employee && (
          <div className="detail">
            <Card cardClass="group">
              {employee?.image ? (
                <img
                  src={employee.image.filePath}
                  alt={employee.image.fileName}
                />
              ) : (
                <p>No image set for this employee</p>
              )}
            </Card>
            <h4>Employee Availability: {classes(employee.class_assigned)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {employee.first_name} &nbsp; {employee.last_name}
            </h4>
            <p>
              <b>&rarr; Email Address : </b> {employee.email}
            </p>
            <p>
              <b>&rarr; Employee_ID : </b> {employee.employee_code}
            </p>
            <p>
              <b>&rarr; Department : </b> {employee.department}
            </p>
            <p>
              <b>&rarr; Designation : </b> {employee.designation}
            </p>
            <p>
              <b>&rarr; Role : </b> {employee.role}
            </p>
            <p>
              <b>&rarr; class_assigned: </b> {employee.class_assigned}
            </p>
            <p>
              <b>&rarr; Gender : </b> {employee.gender}
            </p>
            <p>
              <b>&rarr; Blood_group : </b> {employee.blood_group}
            </p>
            <p>
              <b>&rarr; Contact_number :</b> {employee.contact_number}
            </p>
            <p>
              <b>&rarr; DOB : </b> {employee.date_of_birth}
            </p>
            <p>
              <b>&rarr; Date of joining: </b> {employee.date_of_joining}
            </p>
            <p>
              <b>&rarr; Total Working hours per day : </b> {Math.ceil(employee.class_assigned * (2/3) * 1.2)} {"Hours"}
            </p>
            <hr />
            <p>
              <b>&rarr; Address: </b> {employee.address}
            </p>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(employee.address),
              }}
            ></div>{employee.address} */}
            <hr />
            <code className="--color-dark">
              Created on: {employee.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {employee.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmployeeDetail;