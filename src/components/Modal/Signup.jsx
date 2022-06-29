import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { authActions } from "../../Redux/Slice/authSlice";

const Signup = () => {
	const dispatch = useDispatch();

	const handleSignUpModalClose = () => {
		dispatch(authActions.signUpModalClose());
		dispatch(authActions.loginModalClose());
		dispatch(authActions.dropDown());
	};

	const handleLoginModalOpen = () => {
		dispatch(authActions.signUpModalClose());
		dispatch(authActions.loginModalOpen());
	};

	const variants = {
		hidden: { opacity: 0, y: 300, transition: { duration: 0.5 } },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<motion.section
			animate='visible'
			initial='hidden'
			variants={variants}
			className='login-container'
		>
			<button className='close-btn' onClick={handleSignUpModalClose}>
				<RiCloseFill />
			</button>
			<h2>Sign up To Amazona</h2>
			<form className='form'>
				<div className='input-container'>
					<input type='text' name='firstname' placeholder='First Name' />
					<input type='text' name='lastname' placeholder='Last Name' />
					<input type='email' name='email' id='email' placeholder='Email' />
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Create Password'
					/>
				</div>
				<button className='modal-btn sign-up-btn'>Sign up</button>
			</form>
			<section className='other-container'>
				<div className='divider'>
					<hr />
					<span className='or'>or</span>
					<hr />
				</div>
				<button className='modal-btn google-login-btn'>
					Sign up with google
				</button>
				<p>
					Already a User?
					<span className='link' onClick={handleLoginModalOpen}>
						Login
					</span>
				</p>
			</section>
		</motion.section>
	);
};

export default Signup;

//Slices used : authSlice
