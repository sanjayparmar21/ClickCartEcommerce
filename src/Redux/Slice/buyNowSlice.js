import { createSlice } from "@reduxjs/toolkit";

const buyNowSlice = createSlice({
	name: "buyNowSlice",
	initialState: { count: 1 },
	reducers: {
		increment: (state) => {
			state.count < 5 && state.count++;
		},
		decrement: (state) => {
			state.count > 1 && state.count--;
		},
	},
});

export const buyNowActions = buyNowSlice.actions;
export default buyNowSlice;
