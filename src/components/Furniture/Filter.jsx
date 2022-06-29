import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Modal,
	List,
	ListItemButton,
	ListItemText,
	Collapse,
	ListSubheader,
	Slider,
	Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { filterActions } from "../../Redux/Slice/fliterSlice";

const Filter = () => {
	//state for Drop downs
	const [openBrands, setOpenBrands] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);
	const [value, setValue] = useState([250, 2000]);

	//Data from redux
	const dispatch = useDispatch();
	const data = useSelector((state) => state.data.products);
	const brands = useSelector((state) => state.filter.brands);
	const place = useSelector((state) => state.filter.categories);
	const isFilter = useSelector((state) => state.filter.isFilter);
	const assured = useSelector((state) => state.filter.assured);
	const delivery = useSelector((state) => state.filter.delivery);
	const outOfStock = useSelector((state) => state.filter.outOfStock);

	//handling assured check
	const handleAssured = (e) => {
		if (e.target.checked) {
			dispatch(filterActions.isAssured(true));
		} else {
			dispatch(filterActions.isAssured(false));
		}
	};

	//handling delivery check
	const handleDelivery = (e) => {
		if (e.target.checked) {
			dispatch(filterActions.isDelivery(true));
		} else {
			dispatch(filterActions.isDelivery(false));
		}
	};

	//handling out of stock check
	const handleOutOfStock = (e) => {
		if (e.target.checked) {
			dispatch(filterActions.isOutOfStock(true));
		} else {
			dispatch(filterActions.isOutOfStock(false));
		}
	};

	//extracting companies from data and making unique Array of brands
	const brand = [];
	data.map((item) => brand.push(item.company));
	let companies = [...new Set(brand)];

	//getting selected companies by user
	const handleChange = (e) => {
		if (e.target.checked) {
			dispatch(filterActions.addBrand(e.target.value));
		} else {
			dispatch(filterActions.removeBrand(e.target.value));
		}
	};

	//extracting the categories from data and making unique Array of categories
	const categories = [];
	data.map((item) => categories.push(item.category));
	const categoriesList = [...new Set(categories)];

	//categories Selected by user
	const handleCategorySelection = (e) => {
		if (e.target.checked) {
			dispatch(filterActions.addCategory(e.target.value));
		} else {
			dispatch(filterActions.removeCategory(e.target.value));
		}
	};

	//getting the user input for price and passing the data to store
	const handlePriceChange = (e, newValue) => {
		setValue(newValue);
		dispatch(filterActions.setPrice(e.target.value));
	};

	//extracting new Set of prices from data
	const price = [];
	data.map((item) => price.push(item.price));
	const priceList = [...new Set(price)];

	const minPrice = Math.round(Math.min(...priceList));
	const maxPrice = Math.round(Math.max(...priceList));
	const step = maxPrice / 10;

	//used in animations
	const variants = {
		hidden: { x: 400, transition: { duration: 0.3 } },
		visible: { x: 0, transition: { duration: 0.3 } },
	};

	//clearing all filters
	const handleClearFliters = () => {
		dispatch(filterActions.resetFilter());
	};

	return (
		<Modal
			open={isFilter}
			onClose={() => dispatch(filterActions.closeFilter())}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<motion.section
				animate='visible'
				initial='hidden'
				variants={variants}
				className='container'
			>
				<List
					subheader={
						<ListSubheader
							sx={{ boxShadow: "0 5px 10px -10px rgba(0, 0, 0, 0.2)" }}
						>
							FILTER BY:
						</ListSubheader>
					}
				>
					<ListItemButton>
						<input
							type='checkbox'
							id='assured'
							value='assured'
							onChange={handleAssured}
							defaultChecked={assured}
						/>
						<label className='label' htmlFor='assured'>
							Assured
						</label>
					</ListItemButton>
					<ListItemButton>
						<input
							type='checkbox'
							id='stock'
							value='out of stock'
							onChange={handleOutOfStock}
							defaultChecked={outOfStock}
						/>
						<label className='label' htmlFor='stock'>
							Exclude Out Of Stock
						</label>
					</ListItemButton>
					<ListItemButton>
						<input
							type='checkbox'
							id='Deliverable'
							value='delivery'
							onChange={handleDelivery}
							defaultChecked={delivery}
						/>
						<label className='label' htmlFor='Deliverable'>
							Exclude non-Deliverables
						</label>
					</ListItemButton>
					<ListItemText primary='Price Range' sx={{ marginLeft: "1rem" }} />
					<Slider
						sx={{ width: "14.8rem", margin: "2rem 2rem 0" }}
						value={value}
						marks
						step={step}
						max={maxPrice}
						min={minPrice}
						onChange={handlePriceChange}
						valueLabelDisplay='auto'
					/>
					<ListItemButton onClick={() => setOpenBrands(!openBrands)}>
						<ListItemText primary='Brands' />
						{openBrands ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openBrands} timeout='auto' unmountOnExit>
						{companies.map((brand) => {
							return (
								<ListItemButton key={brand} sx={{ padding: "0.5rem 2rem" }}>
									<input
										type='checkbox'
										id={brand}
										value={brand}
										onChange={handleChange}
										defaultChecked={brands.includes(brand)}
									/>
									<label className='label' htmlFor={brand}>
										{brand}
									</label>
								</ListItemButton>
							);
						})}
					</Collapse>
					<ListItemButton onClick={() => setOpenCategory(!openCategory)}>
						<ListItemText primary='Category' />
						{openCategory ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openCategory} timeout='auto' unmountOnExit>
						{categoriesList.map((category) => {
							return (
								<ListItemButton key={category} sx={{ padding: "0.5rem 2rem" }}>
									<input
										type='checkbox'
										id={category}
										value={category}
										onChange={handleCategorySelection}
										defaultChecked={place.includes(category)}
									/>
									<label className='label' htmlFor={category}>
										{category}
									</label>
								</ListItemButton>
							);
						})}
					</Collapse>
				</List>
				<div className='btn-container'>
					<Button
						size='small'
						variant='contained'
						onClick={() => dispatch(filterActions.closeFilter())}
					>
						Close
					</Button>
					<Button size='small' variant='outlined' onClick={handleClearFliters}>
						Clear
					</Button>
				</div>
			</motion.section>
		</Modal>
	);
};

export default Filter;

// slices being used: FilterSlice.js and DataSlice.js
// there are 14 actions being dispatched to filterSlice for getting filtered data
// being imported in Navigation.js
