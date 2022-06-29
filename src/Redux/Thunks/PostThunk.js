import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

const productsColRef = collection(db, "Products");

export const postProductDataThunk = createAsyncThunk(
	"type/postData",
	async (data) => {
		try {
			const response = await addDoc(productsColRef, data);
			console.log("reafdsflk");
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);
