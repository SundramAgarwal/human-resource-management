import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import employeeReducer from "../redux/features/employee/employeeSlice";
import filterReducer from "../redux/features/employee/filterSlice";
// import attendanceReducer from "../redux/features/attendance/attendanceSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    filter: filterReducer,
    // attendance: attendanceReducer,
  },
});