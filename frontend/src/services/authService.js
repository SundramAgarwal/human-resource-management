import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// Register Admin
export const registerAdmin = async (adminData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/admins/register`, 
        adminData,{withCredentials: true});
        if (response.statusText === "OK") {
            toast.success("Admin - Registered Successfully")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};

// Login Admin
export const loginAdmin = async (adminData) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/admins/login`, 
            adminData,);
            if (response.statusText === "OK") {
                toast.success("Admin - Logged IN Successfully")
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
export const logoutAdmin = async () => {
    try {
        await axios.get(
            `${BACKEND_URL}/api/admins/logout`,
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
export const forgotPassword = async (adminData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/admins/forgotpassword`, adminData);
            toast.success(response.data.message) 
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};

//Reset password
export const resetPassword = async (adminData,resetToken) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}/api/admins/resetpassword/${resetToken}`, adminData);
            return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};
// Get Login Status
export const getLoginStatus = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admins/loggedin`);
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

export const getAdmin = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admins/getAdmin`);
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

export const updateAdmin = async (formData) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/api/admins/updateadmin`, formData);
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
      const response = await axios.patch(`${BACKEND_URL}/api/admins/changepassword`, formData);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };



  
