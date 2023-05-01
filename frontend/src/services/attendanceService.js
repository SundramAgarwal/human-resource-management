import axios from "axios";
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

export const addAttendance = async(data) => {
    try{
          console.log("data is ", data)
          const result = await axios.post(`${BACKEND_URL}/api/attendance`,data);
          console.log("result from backend ", result)
    }
    catch(error){
        console.log("error in adding employing in attendance ", error.message);
    }
}

export const getAttendance = () => {
    
}