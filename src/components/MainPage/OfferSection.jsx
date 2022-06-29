import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { productsColRef } from "../../Redux/Thunks/FetchThunk";
import CountDown from "./CountDown";

const OfferSection = () => {
	const [width, setWidth] = useState(0);
	const [data, setData] = useState([]);
	const sliderRef = useRef();

	const q = query(productsColRef, where("discount", ">=", 35));

	useEffect(() => {
		onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setData(data);
		});
	}, []);

	useEffect(() => {
		setWidth(data.length * 100);
	}, [data]);

	const handlePreview = (id) => {
		const product = data.find((item) => item.id === id);
		localStorage.setItem("product", JSON.stringify(product));
	};

	data.map((item) => {});

	return (
		<section className='mini-container'>
			<div className='offer-img-container'>
				<img
					className='main-page-offer-banner'
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxaI1VKktQtMHPQACxBHEI_3ZetspTpSg3nQ&usqp=CAU'
					alt='sale-banner'
				/>
			</div>
			<article className='deals'>
				<CountDown />
				<motion.div className='discounted-items-slider'>
					<motion.section
						ref={sliderRef}
						whileTap={{ cursor: "grabbing" }}
						drag='x'
						dragConstraints={{ right: 0, left: -width }}
						className='discounted-items'
					>
						{data.map((item) => {
							let discountedPrice = item.price * (item.discount / 100);
							let price = item.price - discountedPrice;
							price.toFixed(2);
							return (
								<motion.div className='item' key={item.id}>
									<img src={item.image} alt='product-image' />
									<h4>
										<Link
											onClick={() => handlePreview(item.id)}
											to='/product-page'
										>
											{item.name}
										</Link>
									</h4>
									<div className='price-details'>
										<p className='price'>$ {price}</p>
										<span>$ {item.price.toFixed(2)}</span>
									</div>
								</motion.div>
							);
						})}
					</motion.section>
				</motion.div>
			</article>
		</section>
	);
};

export default OfferSection;
