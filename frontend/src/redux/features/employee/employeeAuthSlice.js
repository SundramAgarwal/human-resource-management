import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("full_name");
// const name = JSON.parse(localStorage.getItem("name"));
console.log(name)

const initialState = {
    employeeIsLoggedIn: false,
    name: name ? name : "",
    employee: {
      first_name: "",
      last_name: "",
      department: "",
      designation: "",
      role: "",
      class_assigned: "",
      gender: "",
      blood_group: "",
      contact_number: "",
      date_of_birth: "",
      date_of_joining: "",
      email: "",
      address: "",
      image: ""
    }
  }

const employeeAuthSlice = createSlice({
  name: "employeeAuth",
  initialState,
  reducers: {
    SET_EMPLOYEE_LOGIN(state, action) {
      state.employeeIsLoggedIn = action.payload;
    },
    SET_EMPLOYEE_NAME(state, action) {
        localStorage.setItem("full_name", JSON.stringify(action.payload));
        state.full_name = action.payload;
    }, 
    SET_EMPLOYEE(state, action) {
        const profile = action.payload;
        state.employee.first_name = profile.first_name;
        state.employee.last_name = profile.last_name;
        state.employee.employee_code = profile.employee_code;
        state.employee.department = profile.department;
        state.employee.designation = profile.designation;
        state.employee.role = profile.role;
        state.employee.class_assigned = profile.class_assigned;
        state.employee.gender = profile.gender;
        state.employee.blood_group = profile.blood_group;
        state.employee.contact_number = profile.contact_number;
        state.employee.date_of_birth = profile.date_of_birth;
        state.employee.date_of_joining = profile.date_of_joining;
        state.employee.email = profile.email;
        state.employee.address = profile.address;
        state.employee.image = profile.image;
      },
  },
});

export const { SET_EMPLOYEE_LOGIN, SET_EMPLOYEE_NAME, SET_EMPLOYEE } = employeeAuthSlice.actions;

export const selectEmployeeIsLoggedIn = (state) => state.employeeAuth.employeeIsLoggedIn;
export const selectEmployeeName = (state) => state.employeeAuth.full_name;
export const selectEmployee = (state) => state.employeeAuth.employee;

export default employeeAuthSlice.reducer;
