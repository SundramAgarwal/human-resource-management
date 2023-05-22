import React from "react";
import Card from "../../card/Card";
import "./EmployeeForm.scss";

const EmployeeForm = ({ employee, handleInputChange, saveEmployee }) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveEmployee}>
          <label>
            First Name:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Employee First name"
            name="first_name"
            value={employee?.first_name}
            onChange={handleInputChange}
            required
          />

          <label>
            Last Name:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Employee last name"
            name="last_name"
            value={employee?.last_name}
            onChange={handleInputChange}
            required
          />

          <label>
            Email:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            placeholder="Employee gmail Address"
            name="email"
            value={employee?.email}
            onChange={handleInputChange}
            required
          />

          <label>
            Department:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="department"
            value={employee?.department}
            onChange={handleInputChange}
            required
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

          <label>
            Designation:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="designation"
            value={employee?.designation}
            onChange={handleInputChange}
            required
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

          <label>
            Classes Assigned:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Classes"
            name="class_assigned"
            value={employee?.class_assigned}
            onChange={handleInputChange}
            required
          />

          <label>
            Role:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="role"
            value={employee?.role}
            onChange={handleInputChange}
            required
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

          <label>
            Gender:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="gender"
            value={employee?.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Genderqueer">Genderqueer</option>
            <option value="Two-spirit">Two-spirit</option>
            <option value="Agender">Agender</option>
            <option value="Androgynous">Androgynous</option>
            <option value="Bigender">Bigender</option>
            <option value="Genderfluid">Genderfluid</option>
            <option value="Transgender">Transgender</option>
            <option value="Other/Prefer not to say">
              Other/Prefer not to say
            </option>
          </select>

          <label>
            Blood Group:<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="blood_group"
            value={employee?.blood_group}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <label>
            Contact:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Contact Number"
            name="contact_number"
            value={employee?.contact_number}
            onChange={handleInputChange}
            required
          />

          <label>
            Date Of Birth:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={employee?.date_of_birth}
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
            Date Of Joining:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="date_of_joining"
            value={employee?.date_of_joining}
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
            Address:<span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            rows="5"
            cols="42"
            name="address"
            style={{ fontSize: "16px", resize: "none" }}
            value={employee?.address}
            onChange={handleInputChange}
            required
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

export default EmployeeForm;
