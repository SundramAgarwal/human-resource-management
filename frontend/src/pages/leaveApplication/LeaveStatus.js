import React, { useEffect, useState } from "react";
import "./EmployeeProfile.scss";
import "./EmployeeForm.scss";
import "./LeaveStatus.css";
import useRedirectLoggedOutEmployee from "../../customHook/useRedirectLoggedOutEmployee";
// import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useDispatch } from "react-redux";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/leaveApplications/`;

const getLastLeave = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteLeave = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const getLeaveStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "pending":
      return "pending pending-blink";
    case "expired":
      return "expired";
    default:
      return "";
  }
};

const LeaveStatus = () => {
  useRedirectLoggedOutEmployee("/employeelogin");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [leaveStatus, setLeaveStatus] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  const delLeave = async (id) => {
    const data = await deleteLeave(id);
    navigate("/employeedashboard");
    console.log(data);
  };

  const confirmDelete = (id) => {
    if (leaveStatus?.status !== "pending") {
      alert(
        "This leave application cannot be deleted as it is not in pending state and must be saved due to company policy."
      );
      return;
    }

    confirmAlert({
      title: "Delete Employee",
      message: "Are you sure you want to delete Employee?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delLeave(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Employee Not Deleted"),
        },
      ],
    });
  };

  useEffect(() => {
    // setIsLoading(true);
    const getLastLeaveStatus = async () =>  {
      const leaveData = await getLastLeave();
      console.log(leaveData);

      setLeaveStatus(leaveData.data);
      // setIsLoading(false);
    }
    getLastLeaveStatus();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {/* {isLoading && <SpinnerImg />} */}
      <>
        <h3>Last Leave Status</h3>
        {leaveStatus === [] ? (
          <p>No Pending leaves</p>
        ) : (
          <Card cardClass={"card"}>
            <p>
              <b>Starting Date of Leave : </b> {new Date(leaveStatus?.startDate).toLocaleDateString()}
            </p>
            <p>
              <b>Last Date of Leave : </b> {new Date(leaveStatus?.endDate).toLocaleDateString()}
            </p>
            <p>
              <b>Type of Leave : </b> {leaveStatus?.type}
            </p>
            <p>
              <b>Reason For Leave : </b> {leaveStatus?.reason}
            </p>
            <p>
              <b>Status : </b>
              <span
                className={`status ${getLeaveStatusColor(leaveStatus?.status)}`}
              >
                {leaveStatus?.status}
              </span>
            </p>
            <button
              className="--btn --btn-primary --blue --rounded"
              onClick={() => confirmDelete(leaveStatus._id)}
            >
              Delete Application
            </button>
          </Card>
        )}
      </>
    </div>
  );
};

export default LeaveStatus;
