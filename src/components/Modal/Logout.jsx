import { useDispatch } from "react-redux";

import { authActions } from "../../Redux/Slice/authSlice";

const Logout = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(authActions.logout());
	};

	// handles closing of madal
	const handleLogoutModalClose = () => {
		dispatch(authActions.logoutModalClose());
		dispatch(authActions.dropDown());
	};

	return (
		<section className='modal-container'>
			<article className='modal'>
				<h2>Are you sure you want to logout?</h2>
				<div className='modal-buttons'>
					<button className='modal-btn btn' onClick={handleLogout}>
						Yes
					</button>
					<button className='modal-btn btn' onClick={handleLogoutModalClose}>
						No
					</button>
				</div>
			</article>
		</section>
	);
};

export default Logout;

//Slices used : authSlice
