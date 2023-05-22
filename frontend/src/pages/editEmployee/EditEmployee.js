import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import EmployeeForm2 from "../../components/employee/employeeForm/EmployeeForm2";
import {
  getEmployee,
  getEmployees,
  selectIsLoading,
  selectEmployee,
  // updateEmployee,
} from "../../redux/features/employee/employeeSlice";

import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/employees/`;

const updateEmployee = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const employeeEdit = useSelector(selectEmployee);

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEmployee(employeeEdit);
  }, [employeeEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    // console.log("employee data is ",employee)
    const formData = new FormData();
    formData.append("department", employee?.department);
    formData.append("designation", employee?.designation);
    formData.append("class_assigned", employee?.class_assigned);
    formData.append("role", employee?.role);

    console.log(...formData);

    // const data = await dispatch(updateEmployee({ id, employee}));
    const data = await updateEmployee(id, employee);
    console.log(data);
    await dispatch(getEmployees());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Employee</h3>
      <EmployeeForm2
        employee={employee}
        handleInputChange={handleInputChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default EditEmployee;
