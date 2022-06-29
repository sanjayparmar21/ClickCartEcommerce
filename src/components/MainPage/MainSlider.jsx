import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";

const MainSlider = () => {
	const [index, setIndex] = useState(0);

	const featuredData = useSelector((state) => state.data.featured);

	//logic for auto slider
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(index + 1);
			if (index === featuredData.length - 1) {
				setIndex(0);
			}
		}, 4000);
		return () => clearInterval(interval);
	}, [index]);

	//logic to show previous banner
	const prevSlide = () => {
		setIndex(index - 1);
		if (index === 0) {
			setIndex(featuredData.length - 1);
		}
	};

	//logic to show next banner
	const nextSlide = () => {
		setIndex(index + 1);
		if (index === featuredData.length - 1) {
			setIndex(0);
		}
	};

	return (
		<div className='banner'>
			<button className='left' onClick={prevSlide}>
				<ArrowBackIosNewIcon />
			</button>
			{featuredData.length > 0 && (
				<img className='banner-img' src={featuredData[index].img} />
			)}
			<button className='right' onClick={nextSlide}>
				<ArrowForwardIosIcon />
			</button>
		</div>
	);
};

export default MainSlider;
// being
