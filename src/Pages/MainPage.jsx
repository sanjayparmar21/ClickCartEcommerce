import { useEffect } from "react";
import { useDispatch } from "react-redux";

import MainSlider from "../components/MainPage/MainSlider";
import Categories from "../components/MainPage/Categories";
import OfferSection from "../components/MainPage/OfferSection";
import { fetchFeatured } from "../Redux/Thunks/FetchFeaturedThunk";

const MainPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFeatured());
	});

	return (
		<main className='main-page-container'>
			<MainSlider />
			<Categories />
			<OfferSection />
		</main>
	);
};

export default MainPage;

// Being imported in : 1)App.js
