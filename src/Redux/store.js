import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Slice/fliterSlice";
import buyNowSlice from "./Slice/buyNowSlice";
import authSlice from "./Slice/authSlice";
import cartSlice from "./Slice/cartSlice";
import dataSlice from "./Slice/dataSlice";

const store = configureStore({
	reducer: {
		data: dataSlice.reducer,
		filter: filterSlice.reducer,
		buyNow: buyNowSlice.reducer,
		auth: authSlice.reducer,
		cart: cartSlice.reducer,
	},
});

export default store;
