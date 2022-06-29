import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

// import axios from "axios";

// export const fetchData = createAsyncThunk("type/getData", async () => {
// 	try {
// 		const response = await axios("https://course-api.com/react-store-products");
// 		return response.data;
// 	} catch (error) {
// 		console.log(error.response);
// 	}
// });

export const productsColRef = collection(db, "Products");

export const fetchData = createAsyncThunk("data/fetchData", async () => {
	try {
		const response = await getDocs(productsColRef);
		const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		return data;
	} catch (error) {
		console.log(error.response);
	}
});

export const extraFetchReducers = {
	[fetchData.pending]: (state) => {
		state.isLoading = true;
	},
	[fetchData.fulfilled]: (state, action) => {
		state.isLoading = false;
		state.products = action.payload;
		state.filteredProducts = action.payload;
	},
	[fetchData.rejected]: (state) => {
		state.isLoading = false;
		state.isError = true;
	},
};
