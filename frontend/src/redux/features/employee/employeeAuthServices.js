import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// Login Admin
export const loginEmployee = async (employeeData) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/employees/login`, 
            employeeData,);
            console.log(response.statusText)
            if (response.statusText === "OK") {
                toast.success("Employee - Logged IN Successfully")
            }
            return response.data
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            toast.error(message);
        }
    };

// logout Admin
export const logoutEmployee = async () => {
    try {
        await axios.post(
            `${BACKEND_URL}/api/employees/logout`,
            toast.success("Logged Out Successfully")
        );
 
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};

// Forgot password
export const forgotPassword = async (employeeData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/employees/forgotpassword`, employeeData);
            toast.success(response.data.message) 
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};

//Reset password
export const resetPassword = async (employeeData,resetToken) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}/api/employees/employeeresetpassword/${resetToken}`, employeeData);
            return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};
// Get Login Status
export const loginStatus = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/employees/loggedin`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

// get admin profile

export const getEmployeeItself = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/employees/getEmployeeItself`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


// update profile

export const updateEmployeeItself = async (formData) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/employees/updateemployeeitself`, formData);
      console.log('updateEmployeeItself')
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

// change password

export const changePassword = async (formData) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/employees/changepassword`, formData);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };