import { useSelector, useDispatch } from "react-redux";
import { buyNowActions } from "../../Redux/Slice/buyNowSlice";

const Counter = () => {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.buyNow.count);

	const handleIncrement = () => {
		dispatch(buyNowActions.increment());
	};

	const handleDecrement = () => {
		dispatch(buyNowActions.decrement());
	};

	return (
		<section className='counter'>
			<button className='counter-btn' onClick={handleDecrement}>
				-
			</button>
			<p className='count'>{count}</p>
			<button className='counter-btn right-cbtn' onClick={handleIncrement}>
				+
			</button>
		</section>
	);
};
export default Counter;
