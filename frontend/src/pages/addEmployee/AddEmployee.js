import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import EmployeeForm from "../../components/employee/employeeForm/EmployeeForm";
import {
  createEmployee,
  selectIsLoading,
} from "../../redux/features/employee/employeeSlice";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  department: "",
  designation: "",
  class_assigned: "",
  role: "",
  gender: "",
  blood_group: "",
  contact_number: "",
  date_of_birth: "",
  date_of_joining: "",
  address: ""
};

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initialState);
  const [employeeImage, setEmployeeImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const isLoading = useSelector(selectIsLoading);

  const { 
    first_name,
    last_name,
    email,
    department,
    designation,
    class_assigned, 
    role, 
    gender,
    blood_group,
    contact_number,
    date_of_birth,
    date_of_joining,
    address
   } = employee;

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateEmployee_code = (department) => {
    const letter = department.slice(0, 3).toUpperCase();
    const number = Date.now();
    const employee_code = letter + "-" + number;
    return employee_code;
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", employeeImage);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("employee_code", generateEmployee_code(department));
    formData.append("department", department);
    formData.append("designation", designation);
    formData.append("class_assigned", Number(class_assigned));
    formData.append("role", role);
    formData.append("gender", gender);
    formData.append("blood_group", blood_group);
    formData.append("contact_number", "+" + 91 + " " + Number(contact_number));
    formData.append("date_of_birth",date_of_birth)
    formData.append("date_of_joining",date_of_joining)
    formData.append("address", address);
    

    console.log(...formData);

    await dispatch(createEmployee(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Employee</h3>
      <EmployeeForm
        employee={employee}
        employeeImage={employeeImage}
        imagePreview={imagePreview}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default AddEmployee;
 