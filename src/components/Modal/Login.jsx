import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import loginGif from "../../Assets/login.gif";
import { authActions } from "../../Redux/Slice/authSlice";
import Signup from "./Signup";
// import { loginThunk } from "../../Redux/Thunks/LoginThunk";

const Login = () => {
	const dispatch = useDispatch();
	const isSignUp = useSelector((state) => state.auth.isSignUpModalOpen);
	const userToken = useSelector((state) => state.auth.userToken);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLoginModalClose = () => {
		dispatch(authActions.loginModalClose());
		dispatch(authActions.dropDown());
	};

	const data = { email, password };

	//passing data to thunk and getting token
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submit triggered");
		// dispatch(loginThunk(data));
		localStorage.setItem("token", userToken);
		localStorage.setItem("isLoggedIn", true);
		handleLoginModalClose();
	};

	//handles opening of the signup modal
	const handleSignUpModal = () => {
		dispatch(authActions.signUpModalOpen());
	};

	//animation variants
	const variants = {
		hidden: { opacity: 0, y: -300, transition: { duration: 0.5 } },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};
	return (
		<section className='modal-container'>
			<article className='login-modal'>
				<section className='animation-container'>
					<img src={loginGif} alt='login gif' style={{ width: "100%" }} />
				</section>
				{!isSignUp ? (
					<motion.section
						animate='visible'
						initial='hidden'
						variants={variants}
						className='login-container'
					>
						<button className='close-btn' onClick={handleLoginModalClose}>
							<RiCloseFill />
						</button>
						<h2>Login To Amazona</h2>
						<form className='form'>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type='password'
								name='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Password'
							/>
							<span tabIndex='0' className='forgot-password link'>
								forgot password ?
							</span>
							<button className='modal-btn' onClick={handleSubmit}>
								Log in
							</button>
						</form>
						<section className='other-container'>
							<div className='divider'>
								<hr />
								<span className='or'>or</span>
								<hr />
							</div>
							<button className='modal-btn google-login-btn'>
								Login with google
							</button>
							<p>
								New To Amazona?
								<span className='link' tabIndex='0' onClick={handleSignUpModal}>
									Create Account
								</span>
							</p>
						</section>
					</motion.section>
				) : (
					<Signup />
				)}
			</article>
		</section>
	);
};

export default Login;

//Slices used: authSlice
