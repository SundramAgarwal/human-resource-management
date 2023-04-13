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
  employee_code: "",
  role: "",
  gender: "",
};

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initialState);
  const [employeeImage, setEmployeeImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { first_name, role, gender } = employee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateEmployee_code = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const employee_code = letter + "-" + number;
    return employee_code;
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("employee_code", generateEmployee_code(role));
    formData.append("role", role);
    // formData.append("quantity", Number(quantity));
    formData.append("gender", Number(gender));
    formData.append("address", address);
    formData.append("image", employeeImage);

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
        address={address}
        setAddress={setAddress}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default AddEmployee;
