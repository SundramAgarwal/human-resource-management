import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeForm.scss";
import axios from "axios";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/leaveApplications/`;

const createLeave = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const initialState = {
  startDate: "",
  endDate: "",
  type: "",
  reason: "",
};

const LeaveForm = () => {
  const navigate = useNavigate();
  const [leaveFormData, setLeaveFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveFormData({ ...leaveFormData, [name]: value });
  };

  const saveLeave = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().slice(0, 10);
    const { startDate, endDate } = leaveFormData;

    if (startDate < currentDate || endDate < currentDate) {
      // show a toast error message
      toast.error("Start date or end date must not be in the past");
      return;
    }

    const data = await createLeave(leaveFormData);
    console.log(data);
    navigate("/leave-status");
  };
  return (
    <div>
      <h3 className="--mt">Leave Application Form</h3>
      <div className="add-product">
        <Card cardClass={"card"}>
          <form onSubmit={saveLeave}>
            <label>
              From:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              placeholder="Start Date for Leave"
              name="startDate"
              value={leaveFormData?.startDate}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "3.5vh",
                margin: "10px 0 10px 0 ",
                padding: "8px 12px",
                boxSizing: "border-box",
                fontSize: "16px",
              }}
              required
            />

            <label>
              To:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              placeholder="End Date for Leave"
              name="endDate"
              value={leaveFormData?.endDate}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "3.5vh",
                margin: "10px 0 10px 0 ",
                padding: "8px 12px",
                boxSizing: "border-box",
                fontSize: "16px",
              }}
              required
            />

            <label>
              Type of Leave:<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="type"
              value={leaveFormData?.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a type of Leave</option>
              <option value="Vacation/Annual Leave">Vacation/Annual Leave</option>
              <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
              <option value="Bereavement Leave">Bereavement Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Jury Duty Leave">Jury Duty Leave</option>
              <option value="Military Leave">Military Leave</option>
              <option value="Compensatory Leave">Compensatory Leave</option>
              <option value="Others">Others</option>
            </select>

            <label>
              Reason:<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              rows="5"
              cols="42"
              name="reason"
              style={{ fontSize: "16px", resize: "none" }}
              value={leaveFormData?.reason}
              onChange={handleInputChange}
              required
            ></textarea>

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Apply
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LeaveForm;
