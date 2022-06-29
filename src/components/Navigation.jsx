import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import { filterActions } from "../Redux/Slice/fliterSlice";
import { authActions } from "../Redux/Slice/authSlice";
import Filter from "./Furniture/Filter";

const Navigation = () => {
	const [dropDown, setDropDown] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const filteredData = useSelector((state) => state.data.filteredProducts);
	const searchTerm = useSelector((state) => state.filter.searchTerm);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);
	const count = useSelector((state) => state.cart.cartItemCount);
	const suggestions = useSelector((state) => state.filter.suggestions);

	//to show and hide the filter component
	const handleFilter = () => {
		dispatch(filterActions.toggleFilter());
	};

	//the search term is made avaliable in store and used in products.js component
	const handleSearch = (e) => {
		dispatch(filterActions.search(e.target.value));
	};

	//to logout/login the user
	const handleLogStatus = () => {
		if (isLoggedIn) {
			dispatch(authActions.logoutModalOpen());
		} else {
			dispatch(authActions.loginModalOpen());
		}
	};

	//clearing suggestions on selection by user
	const handleSuggestionClick = (selectedSuggestion) => {
		dispatch(filterActions.search(selectedSuggestion));
		dispatch(filterActions.setSuggestions([]));
	};

	return (
		<>
			<nav className='nav'>
				<section className='nav-leftside'>
					<h1 className='logo'>
						<Link to='/'>ClickCart</Link>
					</h1>
					<input
						className='search'
						value={searchTerm}
						onChange={handleSearch}
						type='text'
						placeholder='Search...'
						onBlur={() => {
							setTimeout(() => {
								dispatch(filterActions.setSuggestions([]));
							}, 150);
						}}
					/>
					{suggestions.length > 0 &&
						suggestions.length !== filteredData.length && (
							<div className='suggestions'>
								{suggestions.slice(0, 4).map((suggestion, index) => (
									<option
										className='suggestions-data'
										key={index}
										tabIndex='1'
										onClick={() => handleSuggestionClick(suggestion.input)}
									>
										{suggestion.input}
									</option>
								))}
							</div>
						)}
				</section>
				<section
					className={
						location.pathname === "/home-and-furniture"
							? "nav-btns-container"
							: "nav-btn-container"
					}
				>
					{location.pathname === "/home-and-furniture" && (
						<button className='btn nav-btn' onClick={handleFilter}>
							Filter
						</button>
					)}
					<Link to='/cart'>
						<button className='btn nav-btn'>
							{count === 0 ? `Cart` : `Cart (${count})`}
						</button>
					</Link>
					<div onClick={() => setDropDown(!dropDown)}>
						{isLoggedIn ? (
							<Avatar
								alt={`${user.given_name}`}
								src={user.picture}
								sx={{ cursor: "pointer", width: "2.15rem", height: "2.15rem" }}
							/>
						) : (
							<h1 tabIndex='0' className='user-img'>
								G
							</h1>
						)}
					</div>
				</section>
			</nav>
			<Filter />
			{dropDown && (
				<div className='drop-down-container'>
					<h5>
						Hello {user.given_name ? user.given_name.toLowerCase() : "guest"} !!
					</h5>
					<hr></hr>
					<ul className='drop-down-ul'>
						<Link to='/profile' onClick={() => setDropDown(false)}>
							<li className='nav-tabs'>Your Profile</li>
						</Link>
						<Link to='/orders' onClick={() => setDropDown(false)}>
							<li className='nav-tabs'>Orders</li>
						</Link>
						<Link to='/favourite' onClick={() => setDropDown(false)}>
							<li className='nav-tabs'>Favourite</li>
						</Link>
						<Link to='/seller-portal' onClick={() => setDropDown(false)}>
							<li className='nav-tabs'>Become a Seller</li>
						</Link>
						<li className='nav-tabs' onClick={handleLogStatus}>
							{isLoggedIn ? "Log out" : "Log in"}
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default Navigation;
