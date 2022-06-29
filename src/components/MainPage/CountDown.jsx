import { useState, useEffect } from "react";

const CountDown = () => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSecond] = useState(0);

	//getting the end time
	const counterEndTime = new Date("jun 22 2024 19:00:00").getTime();

	//getting the countDown counter function
	const countDownFunction = () => {
		const now = new Date().getTime();
		const distance = counterEndTime - now;
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);
		return { hours, minutes, seconds };
	};

	//calling the counter function every sec
	useEffect(() => {
		const interval = setInterval(() => {
			const { hours, minutes, seconds } = countDownFunction();
			setHours(hours);
			setMinutes(minutes);
			setSecond(seconds);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className='countdown-container'>
			<h2>CountDown Deals</h2>
			<div className='countdown-counter'>
				<p>{hours}hr : &nbsp;</p>
				<p>{minutes}min : &nbsp;</p>
				<p>{seconds}sec</p>
			</div>
		</div>
	);
};

export default CountDown;
