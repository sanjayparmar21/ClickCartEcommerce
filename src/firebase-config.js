import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const { REACT_APP_API_KEY, REACT_APP_APP_ID, REACT_APP_MESSAGING_id } =
	process.env;

const firebaseConfig = {
	apiKey: { REACT_APP_API_KEY },
	authDomain: "a-682bd.firebaseapp.com",
	projectId: "a-682bd",
	storageBucket: "a-682bd.appspot.com",
	messagingSenderId: { REACT_APP_MESSAGING_id },
	appId: { REACT_APP_APP_ID },
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
