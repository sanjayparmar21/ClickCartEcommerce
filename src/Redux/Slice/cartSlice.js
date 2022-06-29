import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
	cart: [],
	cartItemCount: 0,
};

const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.cartItems.push(action.payload);
		},
		setCart: (state, action) => {
			state.cart = action.payload;
			state.cartItemCount = state.cart.length;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice;
