import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/employees/`;
 
// Create New Employee
const createEmployee = async (formData) => {
  const response = await axios.post(API_URL, formData);
  if (response.statusText === "OK") {
    toast.success("Employee - Registered Successfully")
  }
  return response.data;
};

// get all Employees 
const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete Employee
const deleteEmployee = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
 
// get Employee
const getEmployee = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// // update Employee
// const updateEmployee = async (id,formData) => {
//   const response = await axios.patch(`${API_URL}${id}`,formData);
//   return response.data;
// };

const employeeService = {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    // updateEmployee, 
  };
  
  export default employeeService;