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
  address: "",
};

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initialState);

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
    address,
  } = employee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const generateEmployee_code = (department) => {
    const letter = department.slice(0, 3).toUpperCase();
    const number = Date.now();
    const employee_code = letter + "-" + number;
    return employee_code;
  };

  const validateDateOfBirth = (dob) => {
    const today = new Date();
    const dobDate = new Date(dob);
    const ageDiffMs = today - dobDate;
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age >= 18;
  };

  const validateDateOfJoining = (doj) => {
    const today = new Date();
    const dojDate = new Date(doj);

    return dojDate <= today;
  };

  const saveEmployee = async (e) => {
    e.preventDefault();

    if (!validateDateOfBirth(date_of_birth)) {
      alert("Employee must be at least 22 years old");
      return;
    }

    if (!validateDateOfJoining(date_of_joining)) {
      alert("Date of joining cannot be in the future");
      return;
    }

    const formData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      employee_code: generateEmployee_code(department),
      department: department,
      designation: designation,
      class_assigned: class_assigned,
      role: role,
      gender: gender,
      blood_group: blood_group,
      contact_number: contact_number,
      date_of_birth: date_of_birth,
      date_of_joining: date_of_joining,
      address: address,
    };

    const data = await dispatch(createEmployee(formData));
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Employee</h3>
      <EmployeeForm
        employee={employee}
        handleInputChange={handleInputChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default AddEmployee;

// import axios from "axios";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API_URL = `${BACKEND_URL}/api/employees`;

// const createEmployee = async (formData) => {
//   try {
//     console.log("form data  jhejhjh", formData);
//     const response = await axios.post(API_URL, formData);
//     console.log("response data: ", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("error: ", error);
//     console.log("error response: ", error.response);
//   }
// };
