import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export const featuredColRef = collection(db, "Featured");

export const fetchFeatured = createAsyncThunk(
	"data/fetchFeatured",
	async () => {
		try {
			const response = await getDocs(featuredColRef);
			const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			return data;
		} catch (error) {
			console.log(error.response);
		}
	}
);

export const extraFetchFeaturedReducers = {
	[fetchFeatured.pending]: (state) => {
		state.isLoading = true;
	},
	[fetchFeatured.fulfilled]: (state, action) => {
		state.isLoading = false;
		state.featured = action.payload;
	},
	[fetchFeatured.rejected]: (state) => {
		state.isLoading = false;
		state.isError = true;
	},
};
