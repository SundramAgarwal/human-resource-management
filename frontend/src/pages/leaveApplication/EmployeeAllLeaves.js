import React, { useEffect, useState } from "react";
import "./EmployeeProfile.scss";
import "./EmployeeForm.scss";
import "./LeaveStatus.css";
import Search from "../../components/search/Search";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutEmployee from "../../customHook/useRedirectLoggedOutEmployee";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/leaveApplications/leaves`;

const getLeaveByEmployee = async () => {
  const response = await axios.get(API_URL);
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

const EmployeeAllLeaves = () => {
  useRedirectLoggedOutEmployee("/employeelogin");

  const [totalLeaves, setTotalLeaves] = useState(0);
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  const [rejectedLeaves, setRejectedLeaves] = useState(0);
  const [expiredLeaves, setExpiredLeaves] = useState(0);

  const [allLeaves, setAllLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllLeaves = async () => {
      try {
        const response = await getLeaveByEmployee();
        setAllLeaves(response.data);
        setTotalLeaves(response.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLeaves();
  }, []);

  const filteredLeaveRecords = allLeaves
    .filter((record) => {
      if (!search) {
        return true;
      }
      const type = record.type.toLowerCase();
      const status = record.status.toLowerCase();
      const startDate = new Date(record.startDate).toLocaleDateString();
      const endDate = new Date(record.endDate).toLocaleDateString();
      const searchLower = search.toLowerCase();
      return (
        type.includes(searchLower) ||
        status.includes(searchLower) ||
        startDate.includes(searchLower) ||
        endDate.includes(searchLower)
      );
    })
    .reverse();

  useEffect(() => {
    // Calculate the number of leaves with each status
    const approvedCount = filteredLeaveRecords.filter(
      (record) => record.status === "approved"
    ).length;
    const rejectedCount = filteredLeaveRecords.filter(
      (record) => record.status === "rejected"
    ).length;
    const expiredCount = filteredLeaveRecords.filter(
      (record) => record.status === "expired"
    ).length;
    setApprovedLeaves(approvedCount);
    setRejectedLeaves(rejectedCount);
    setExpiredLeaves(expiredCount);
  }, [filteredLeaveRecords]);

  return (
    <div className="profile --my2">
      <div className="--flex-between --flex-dir-column">
        <span>
          <h1>Total Leaves: {totalLeaves}</h1>
          <h3
            style={{
              color: "green",
            }}
          >
            Approved Leaves: {approvedLeaves}
          </h3>
          <h3
            style={{
              color: "red",
            }}
          >
            Rejected Leaves: {rejectedLeaves}
          </h3>
          <h3
            style={{
              color: "gray",
            }}
          >
            Expired Leaves: {expiredLeaves}
          </h3>
        </span>
        <span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </span>
      </div>
      {filteredLeaveRecords.length === 0 && <p>No Leave applications</p>}
      {isLoading ? (
        <SpinnerImg />
      ) : (
        <div className="profile --my2">
          {filteredLeaveRecords.map((leave, index) => (
            <div key={leave._id}>
              <h2>{index + 1}:</h2>
              <div
                className="card"
                style={{ width: "50rem", marginBottom: "4px" }}
              >
                <div>
                  <p>
                    <b>Applied Date: </b>
                    {new Date(leave.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <b>Start Date:</b>{" "}
                    {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <b>End Date:</b>{" "}
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <b>Type:</b> {leave.type}
                  </p>
                  <p>
                    <b>Reason:</b>
                  </p>
                  <div
                    className="card"
                    style={{
                      width: "45rem",
                      marginLeft: "18px",
                      marginTop: "3px",
                    }}
                  >
                    <p>{leave.reason}</p>
                  </div>

                  <p>
                    <b>Status: </b>
                    <span
                      className={`status ${getLeaveStatusColor(leave.status)}`}
                    >
                      {leave.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeAllLeaves;
