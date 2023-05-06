import axios from "axios";
import { toast } from "react-toastify";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

export const markAttendance = async(data) => {
    try{
          console.log("data is ", data)
          const response = await axios.post(`${BACKEND_URL}/api/attendance`,data);
          console.log("result from backend ", response)
        } catch (error) {
            const message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            toast.error(message);
          }
}

const fetchAttendanceById = async(employeeId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/attendance/${employeeId}`);
        return response.data;
    } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
}


const attendanceService = {
  fetchAttendanceById 
};

export default attendanceService;
