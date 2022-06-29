import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchData } from "../Redux/Thunks/FetchThunk";
import Products from "../components/Furniture/Products";

const Furniture = () => {
	const dispatch = useDispatch();

	// Fetch data on mount
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	return (
		<main className='main-content-wrap'>
			<section className='products-wrapper'>
				<Products />
			</section>
		</main>
	);
};

export default Furniture;

//actions are being dispatched to redux Fetchthunk and FetchFeaturedthunk
//being imported in: 1) App.js
