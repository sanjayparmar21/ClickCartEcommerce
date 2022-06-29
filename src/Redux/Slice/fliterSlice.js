import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFilter: false,
	searchTerm: "",
	brands: [],
	categories: [],
	suggestions: [],
	price: null,
	assured: null,
	delivery: null,
	outOfStock: null,
};

const filterSlice = createSlice({
	name: "filterSlice",
	initialState,
	reducers: {
		toggleFilter: (state) => {
			state.isFilter = !state.isFilter;
		},
		closeFilter: (state) => {
			state.isFilter = false;
		},
		isAssured: (state, action) => {
			state.assured = action.payload;
		},
		isOutOfStock: (state, action) => {
			state.outOfStock = action.payload;
		},
		isDelivery: (state, action) => {
			state.delivery = action.payload;
		},
		addBrand: (state, action) => {
			state.brands.push(action.payload);
		},
		removeBrand: (state, action) => {
			state.brands = state.brands.filter((brand) => brand !== action.payload);
		},
		addCategory: (state, action) => {
			state.categories.push(action.payload);
		},
		removeCategory: (state, action) => {
			state.categories = state.categories.filter(
				(category) => category !== action.payload
			);
		},
		setPrice: (state, action) => {
			state.price = action.payload;
		},
		setSuggestions: (state, action) => {
			state.suggestions = action.payload;
		},
		search: (state, action) => {
			state.searchTerm = action.payload;
		},
		resetFilter: (state) => {
			state.brands = [];
			state.searchTerm = "";
			state.categories = [];
			state.price = null;
			state.assured = null;
			state.delivery = null;
			state.outOfStock = null;
			state.isFilter = false;
		},
	},
});

export const filterActions = filterSlice.actions;
export default filterSlice;

// sortPrice: (state, action) => {
// 	if (action.payload === "asc") {
// 		state.products.sort((a, b) => a.price - b.price);
// 	} else if (action.payload === "desc") {
// 		state.products.sort((a, b) => b.price - a.price);
// 	} else if (action.payload === "reset") {
// 		state.products = [...state.products];
// 	}
// },
