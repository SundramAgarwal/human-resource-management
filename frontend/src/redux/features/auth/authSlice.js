import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("name");
// const name = JSON.parse(localStorage.getItem("name"));
console.log(name)

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  admin: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_ADMIN(state, action) {
      const profile = action.payload;
      state.admin.name = profile.name;
      state.admin.email = profile.email;
      state.admin.phone = profile.phone;
      state.admin.bio = profile.bio;
      state.admin.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_ADMIN } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectAdmin = (state) => state.auth.admin;

export default authSlice.reducer;
