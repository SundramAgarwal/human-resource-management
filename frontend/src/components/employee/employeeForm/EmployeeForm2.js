import React from "react";
import Card from "../../card/Card";

import "./EmployeeForm.scss";

const EmployeeForm2 = ({ employee, handleInputChange, saveEmployee }) => {
  // console.log("employee details ",employee)

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveEmployee}>
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Employee First name"
            name="first_name"
            value={employee?.first_name || ""}
            onChange={handleInputChange}
            disabled
          />

          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Employee last name"
            name="last_name"
            value={employee?.last_name || ""}
            onChange={handleInputChange}
            disabled
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Employee gmail Address"
            name="email"
            value={employee?.email || ""}
            onChange={handleInputChange}
            disabled
          />

          <label>Department:</label>
          <select
            name="department"
            value={employee?.department || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a department</option>
            <option value="Aerospace Engineering">Aerospace Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Civil and Environmental Engineering">
              Civil and Environmental Engineering
            </option>
            <option value="Computer Science and Engineering">
              Computer Science and Engineering
            </option>
            <option value="Electrical and Computer Engineering">
              Electrical and Computer Engineering
            </option>
            <option value="Materials Science and Engineering">
              Materials Science and Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Nuclear Engineering">Nuclear Engineering</option>
            <option value="Computer Applications">Computer Applications</option>
            <option value="Systems and Industrial Engineering">
              Systems and Industrial Engineering
            </option>
            <option value="Law">Law</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Medicine">Medicine</option>
            <option value="Natural Sciences">Natural Sciences</option>
            <option value="Social Sciences">Social Sciences</option>
            <option value="Arts and Humanities">Arts and Humanities</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Other/Unknown">Other/Unknown</option>
          </select>

          <label>Designation:</label>
          <select
            name="designation"
            value={employee?.designation || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a designation</option>
            <option value="Professor">Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Researcher">Researcher</option>
            <option value="Administrator">Administrator</option>
            <option value="Counselor">Counselor</option>
            <option value="Librarian">Librarian</option>
            <option value="Technician">Technician</option>
            <option value="Analyst">Analyst</option>
            <option value="Other/Unknown">Other/Unknown</option>
          </select>

          <label>Classes Assigned:</label>
          <input
            type="text"
            name="class_assigned"
            placeholder="Classes"
            value={employee?.class_assigned || ""}
            onChange={handleInputChange}
          />

          <label>Role:</label>
          <select
            name="role"
            value={employee?.role || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a role</option>
            <option value="Faculty">Faculty</option>
            <option value="Staff">Staff</option>
            <option value="Administration">Administration</option>
            <option value="Researcher">Researcher</option>
            <option value="Teaching Assistant">Teaching Assistant</option>
            <option value="Student Worker">Student Worker</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Guest Faculty">Guest Faculty</option>
          </select>

          <label>Gender:</label>
          <input
            type="text"
            placeholder="Employee Gender"
            name="gender"
            value={employee?.gender || ""}
            onChange={handleInputChange}
            disabled
          />

          <label>Blood Group:</label>
          <input
            type="text"
            placeholder="Blood Group"
            name="blood_group"
            value={employee?.blood_group || ""}
            onChange={handleInputChange}
            disabled
          />

          <label>Contact:</label>
          <input
            type="text"
            placeholder="Contact Number"
            name="contact_number"
            value={employee?.contact_number || ""}
            onChange={handleInputChange}
            disabled
          />

          <label>Date Of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={employee?.date_of_birth || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              height: "3.5vh",
              margin: "10px 0 10px 0 ",
              padding: "8px 12px",
              boxSizing: "border-box",
              fontSize: "16px",
            }}
            disabled
          />

          <label>Date Of Joining:</label>
          <input
            type="date"
            name="date_of_joining"
            value={employee?.date_of_joining || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              height: "3.5vh",
              margin: "10px 0 10px 0 ",
              padding: "8px 12px",
              boxSizing: "border-box",
              fontSize: "16px",
            }}
            disabled
          />

          <label>Address:</label>
          <textarea
            rows="5"
            cols="42"
            name="address"
            style={{ fontSize: "16px", resize: "none" }}
            value={employee?.address || ""}
            onChange={handleInputChange}
            disabled
          ></textarea>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Employee
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EmployeeForm2;
