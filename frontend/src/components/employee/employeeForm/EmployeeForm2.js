import React from "react";
import Card from "../../card/Card";

import "./EmployeeForm.scss";

const EmployeeForm2 = ({ 
  employee,
  employeeImage,  
  imagePreview, 
  handleInputChange,
  handleImageChange,
  saveEmployee,
}) => { 
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveEmployee}>
          <Card cardClass={"group"}>
            <label>Employee Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="employee" />
              </div>
            ) : (
              <p>No image set for this employee.</p>
            )}
          </Card>
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Employee First name"
            name="first_name"
            value={employee?.first_name}
            onChange={handleInputChange}
            disabled
          />

          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Employee last name"
            name="last_name"
            value={employee?.last_name}
            onChange={handleInputChange}
            disabled
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Employee gmail Address"
            name="email"
            value={employee?.email}
            onChange={handleInputChange}
            disabled
          />

          <label>Department:</label>
          <input
            type="text"
            placeholder="Department"
            name="department"
            value={employee?.department}
            onChange={handleInputChange}
          />

          <label>Designation:</label>
          <input
            type="text"
            placeholder="Designation"
            name="designation"
            value={employee?.designation}
            onChange={handleInputChange}
          />

          <label>Classes Assigned:</label>
          <input
            type="number"
            name="class_assigned"
            placeholder="Classes"
            value={employee?.class_assigned}
            onChange={handleInputChange}
          />

          <label>Role:</label>
          <input
            type="text"
            placeholder="Employee Role"
            name="role"
            value={employee?.role}
            onChange={handleInputChange}
          />

          <label>Gender:</label>
          <input
            type="text"
            placeholder="Employee Gender"
            name="gender"
            value={employee?.gender}
            onChange={handleInputChange}
            disabled
          />

          <label>Blood Group:</label>
          <input
            type="text"
            placeholder="Blood Group"
            name="blood_group"
            value={employee?.blood_group}
            onChange={handleInputChange}
            disabled
          />

          <label>Contact:</label>
          <input
            type="text"
            placeholder="Contact Number"
            name="contact_number"
            value={employee?.contact_number}
            onChange={handleInputChange}
          />

          <label>Date Of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={employee?.date_of_birth}
            onChange={handleInputChange}
            disabled
          />

          <label>Date Of Joining:</label>
          <input
            type="date"
            name="date_of_joining"
            value={employee?.date_of_joining}
            onChange={handleInputChange}
            disabled
          />

          <label>Address:</label>
          <textarea 
            rows = '5' 
            cols = '42' 
            name = 'address' 
            style={{fontSize: '16px',resize: "none"}}
            value = {employee?.address} 
            onChange={handleInputChange} ></textarea>

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
