import { createSlice } from "@reduxjs/toolkit";
import { extraFetchReducers } from "../Thunks/FetchThunk";
import { extraFetchFeaturedReducers } from "../Thunks/FetchFeaturedThunk";

const initialState = {
	isLoading: false,
	isError: false,
	products: [],
	filteredProducts: [],
	featured: [],
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setFilteredProducts: (state, action) => {
			state.filteredProducts = action.payload;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
	extraReducers: { ...extraFetchReducers, ...extraFetchFeaturedReducers },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
