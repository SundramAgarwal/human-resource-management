import React, { useState, useEffect } from "react";
import axios from "axios";
import useRedirectLoggedOutAdmin from "../../../customHook/useRedirectLoggedOutAdmin";
import Search from "../../../components/search/Search";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/leaveApplications`;

const getAllLeaveApplicationsByAdmin = async () => {
  const response = await axios.get(`${API_URL}/allLeaves`);
  return response.data;
};

const updateLeaveApplication = async (id, status) => {
  console.log(status);
  const data = {
    status: status, //we have done this because data should should be sent in a object format to the backend
  };
  const response = await axios.patch(`${API_URL}/updateLeave/${id}`, data);
  return response.data;
};

const getLeaveStatusColor = (status) => {
  switch (status) {
    case "accepted":
      return "accepted";
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

const LeaveApplications = () => {
  useRedirectLoggedOutAdmin("/login");

  const [totalPendingLeaves, setTotalPendingLeaves] = useState(0);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllPendingLeaveApplications = async () => {
    const leaveData = await getAllLeaveApplicationsByAdmin();
    console.log(leaveData);

    setLeaveApplications(leaveData.data);
    setTotalPendingLeaves(leaveData.data.length);
  };

  useEffect(() => {
    fetchAllPendingLeaveApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const updatedLeaveApplication = await updateLeaveApplication(id, status);
    const index = leaveApplications.findIndex((app) => app._id === id);
    const updatedLeaveApplications = [...leaveApplications];
    updatedLeaveApplications[index] = updatedLeaveApplication;
    setLeaveApplications(updatedLeaveApplications);
    // window.location.reload();

    fetchAllPendingLeaveApplications();
  };

  const filteredLeaveApplications = leaveApplications?.filter((record) => {
    if (!search) {
      // console.log("hiiii")
      return true;
    }
    const type = record.type.toLowerCase();
    const status = record.status.toLowerCase();
    const department = record.employeeId.department.toLowerCase();
    const designation = record.employeeId.designation.toLowerCase();
    const role = record.employeeId.role.toLowerCase();
    const startDate = new Date(record.startDate).toLocaleDateString();
    const endDate = new Date(record.endDate).toLocaleDateString();
    const searchLower = search.toLowerCase();
    return (
      type.includes(searchLower) ||
      status.includes(searchLower) ||
      startDate.includes(searchLower) ||
      endDate.includes(searchLower) ||
      department.includes(searchLower) ||
      designation.includes(searchLower) ||
      role.includes(searchLower)
    );
  });

  return (
    <div className="profile --my2">
      <div className="--flex-between --flex-dir-column">
        <span>
          <h1>Leave Applications:</h1>
          <h3
            style={{
              color: "red",
            }}
          >
            Pending Leave Applications: {totalPendingLeaves}
          </h3>
        </span>
        <span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </span>
      </div>
      {filteredLeaveApplications?.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        <div>
          {filteredLeaveApplications?.map((application, index) => (
            <div key={index}>
              <h2>{index + 1}:</h2>
              <div
                className="card"
                style={{ width: "50rem", marginBottom: "4px" }}
              >
                <h2 style={{ marginLeft: "17px" }}>
                  Name: {application?.employeeId?.first_name}{" "}
                  {application?.employeeId?.last_name}
                </h2>
                <p>
                  <b>Department:</b> {application?.employeeId?.department}
                </p>
                <p>
                  <b>Designation:</b> {application?.employeeId?.designation}
                </p>
                <p>
                  <b>Role:</b> {application?.employeeId?.role}
                </p>
                <p>
                  <b>Start Date:</b>{" "}
                  {new Date(application?.startDate).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <b>End Date:</b>{" "}
                  {new Date(application?.endDate).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <b>Type of Leave:</b> {application?.type}
                </p>
                <p>
                  <b>Reason:</b>
                  <div
                    className="card"
                    style={{
                      width: "45rem",
                      marginLeft: "18px",
                      marginTop: "3px",
                    }}
                  >
                    {application?.reason}
                  </div>
                </p>
                <p>
                  <b>Status : </b>
                  <span
                    className={`status ${getLeaveStatusColor(
                      application?.status
                    )}`}
                  >
                    {application?.status}
                  </span>
                </p>
                <div className="--flex-between">
                  <button
                    onClick={async () =>
                      handleStatusUpdate(application?._id, "approved")
                    }
                    style={{
                      backgroundColor: "green",
                      borderRadius: "5px",
                      margin: "2px 0px 2px 18px",
                      padding: "4px 8px 4px 8px",
                      fontSize: "16px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                      color: "white",
                      fontWeight: "600",
                    }}
                    disabled={application?.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(application?._id, "rejected")
                    }
                    style={{
                      backgroundColor: "red",
                      borderRadius: "5px",
                      margin: "2px 36rem 2px 0px",
                      padding: "4px 12px 4px 12px",
                      fontSize: "16px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                      color: "white",
                      fontWeight: "600",
                    }}
                    disabled={application?.status === "rejected"}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveApplications;
