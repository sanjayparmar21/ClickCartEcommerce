import { useSelector } from "react-redux";

import Logout from "../components/Modal/Logout";
import Login from "../components/Modal/Login";

const Modal = () => {
	const LogoutModalOpen = useSelector((state) => state.auth.isLogoutModalOpen);
	const LoginModalOpen = useSelector((state) => state.auth.isLoginModalOpen);

	return (
		<>
			{/* Modal content for the logged in user */}
			{LogoutModalOpen && <Logout />}
			{/* Modal content for logged out users */}
			{LoginModalOpen && <Login />}
		</>
	);
};

export default Modal;

// slices being used: authSlice
// no actions are being dispatched
