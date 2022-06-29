import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const url = "http://192.168.1.9:8000/api/login";

// export const loginThunk = createAsyncThunk("type/login", async (data) => {
// 	try {
// 		const response = await axios.post(url, data);
// 		console.log(response.data);
// 		return response.data.Token;
// 	} catch (error) {
// 		console.log("login error", error.response);
// 	}
// });

// export const extraLoginReducers = {
// 	[loginThunk.pending]: (state) => {
// 		state.loading = true;
// 	},
// 	[loginThunk.fulfilled]: (state, action) => {
// 		state.loading = false;
// 		state.userToken = action.payload;
// 	},
// 	[loginThunk.rejected]: (state) => {
// 		state.loading = false;
// 		state.error = true;
// 	},
// };
