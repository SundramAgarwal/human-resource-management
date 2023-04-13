import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import employeeReducer from "../redux/features/employee/employeeSlice";
import filterReducer from "../redux/features/employee/filterSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    filter: filterReducer,
  },
});