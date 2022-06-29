import { useDispatch, useSelector } from "react-redux";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";
import Navigation from "./components/Navigation";
import { authActions } from "./Redux/Slice/authSlice";
import Modal from "./Pages/Modal";
import Cart from "./Pages/Cart";
import Seller from "./Pages/Seller";
import Furniture from "./Pages/Furniture";
import Footer from "./components/Footer";

function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const loginSuccess = (user) => {
		dispatch(authActions.loginSuccess(user));
	};

	useGoogleOneTapLogin({
		onError: (error) => console.log("error", error),
		onSuccess: (response) => loginSuccess(response),
		disabled: isLoggedIn === true,
		googleAccountConfigs: {
			client_id:
				"887939231796-fka8hjrk7vua7f5u83ollk0cclea9r74.apps.googleusercontent.com",
		},
	});

	return (
		<>
			<BrowserRouter>
				<Navigation />
				<Modal />
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/product-page' element={<ProductPage />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/seller-portal' element={<Seller />} />
					<Route path='/home-and-furniture' element={<Furniture />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
