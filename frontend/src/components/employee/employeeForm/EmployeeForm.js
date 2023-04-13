import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./EmployeeForm.scss";

const EmployeeForm = ({ 
  employee,
  employeeImage,
  imagePreview, 
  address,
  setAddress,
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
          <label>Employee First Name:</label>
          <input
            type="text"
            placeholder="Employee First name"
            name="first_name"
            value={employee?.first_name}
            onChange={handleInputChange}
          />

          <label>Employee_ID:</label>
          <input
            type="text"
            placeholder="Employee Category"
            name="employee_code"
            value={employee?.employee_code}
            onChange={handleInputChange}
          />

          <label>Employee role:</label>
          <input
            type="text"
            placeholder="Employee Price"
            name="role"
            value={employee?.role}
            onChange={handleInputChange}
          />

          <label>Employee Gender:</label>
          <input
            type="text"
            placeholder="Employee Gender"
            name="gender"
            value={employee?.gender}
            onChange={handleInputChange}
          />

          <label>Employee Address:</label>
          <ReactQuill
            theme="snow"
            value={address}
            onChange={setAddress}
            modules={EmployeeForm.modules}
            formats={EmployeeForm.formats}
          />

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

EmployeeForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
EmployeeForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default EmployeeForm;
