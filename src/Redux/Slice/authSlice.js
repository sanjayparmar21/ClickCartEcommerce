import { createSlice } from "@reduxjs/toolkit";
// import { extraLoginReducers } from "../Thunks/LoginThunk";

const authSlice = createSlice({
	name: "login",
	initialState: {
		userToken: null,
		isSignUpModalOpen: false,
		isLogoutModalOpen: false,
		isLoginModalOpen: false,
		isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
		user: localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user"))
			: {},
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
			localStorage.setItem("isLoggedIn", true);
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = {};
			state.isLogoutModalOpen = false;
			state.isDropDown = false;
			localStorage.setItem("user", JSON.stringify(state.user));
			localStorage.setItem("isLoggedIn", false);
		},
		logoutModalOpen: (state) => {
			state.isLogoutModalOpen = true;
		},
		logoutModalClose: (state) => {
			state.isLogoutModalOpen = false;
		},
		loginModalOpen: (state) => {
			state.isLoginModalOpen = true;
		},
		loginModalClose: (state) => {
			state.isLoginModalOpen = false;
		},
		signUpModalOpen: (state) => {
			state.isSignUpModalOpen = true;
		},
		signUpModalClose: (state) => {
			state.isSignUpModalOpen = false;
		},
	},
	// extraReducers: extraLoginReducers,
});

export const authActions = authSlice.actions;
export default authSlice;
