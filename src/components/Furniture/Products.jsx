import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cartActions } from "../../Redux/Slice/cartSlice";
import { dataActions } from "../../Redux/Slice/dataSlice";
import { filterActions } from "../../Redux/Slice/fliterSlice";

const Products = () => {
	const dispatch = useDispatch();
	//from data slice
	const data = useSelector((state) => state.data.products);
	const isLoading = useSelector((state) => state.data.isLoading);
	const isError = useSelector((state) => state.data.isError);
	const filteredProducts = useSelector((state) => state.data.filteredProducts);

	//from filter slice
	const searchTerm = useSelector((state) => state.filter.searchTerm);
	const brands = useSelector((state) => state.filter.brands);
	const categories = useSelector((state) => state.filter.categories);
	const price = useSelector((state) => state.filter.price);
	const assured = useSelector((state) => state.filter.assured);
	const delivery = useSelector((state) => state.filter.delivery);
	const outOfStock = useSelector((state) => state.filter.outOfStock);
	const cartItems = useSelector((state) => state.cart.cartItems);

	//applying filters in this functions
	const applyFilters = () => {
		let filteredData = [...data];

		//filtering out assured products
		if (assured) {
			filteredData = filteredData.filter((product) => {
				return product.assured === assured;
			});
		}

		//filtering non deliverables
		if (delivery) {
			filteredData = filteredData.filter((product) => {
				return product.shipping === delivery;
			});
		}

		//filtering out of stock products
		if (outOfStock) {
			filteredData = filteredData.filter((product) => {
				return product.stock === "Available";
			});
		}

		//filtering products by price range
		if (price) {
			let minPrice = price[0];
			let maxPrice = price[1];
			filteredData = filteredData.filter((product) => {
				return product.price >= minPrice && product.price <= maxPrice;
			});
		}

		//filtering brands
		if (brands.length > 0) {
			filteredData = filteredData.filter((product) => {
				return brands.includes(product.company);
			});
		}

		//filtering categories
		if (categories.length > 0) {
			filteredData = filteredData.filter((product) => {
				return categories.includes(product.category);
			});
		}

		//get suggestions based on input
		let suggestions = filteredData.map((item) => {
			if (searchTerm) {
				const regExp = new RegExp(searchTerm, "i");
				return item.name.match(regExp);
			}
			return item;
		});

		const suggestion = suggestions.filter((item) => item !== null);
		dispatch(filterActions.setSuggestions(suggestion));
		dispatch(dataActions.setFilteredProducts(filteredData));
		localStorage.setItem("filteredProducts", JSON.stringify(filteredData));
	};

	useEffect(() => {
		applyFilters();
	}, [brands, assured, categories, delivery, outOfStock, price, searchTerm]);

	//function to get the product details for product page
	const handlePreview = (id) => {
		const product = data.find((item) => item.id === id);
		localStorage.setItem("product", JSON.stringify(product));
	};

	//product is added to cartItems array
	const handleAddToCart = (id) => {
		const product = data.find((item) => item.id === id);
		dispatch(cartActions.addToCart(product));
	};

	//duplicates are filtered from cartItems array and added to cart
	useEffect(() => {
		dispatch(cartActions.setCart([...new Set(cartItems)]));
	}, [cartItems]);

	return (
		<>
			{isLoading && (
				<div className='loading'>
					<p>Loading...</p>
				</div>
			)}
			{isError && (
				<div className='loading'>
					<p>Error...</p>
				</div>
			)}
			{filteredProducts
				.filter((value) => {
					if (value.name === "") {
						return value;
					} else {
						return value.name
							.replace(/ /g, "")
							.toLowerCase()
							.includes(searchTerm.replace(/ /g, "").toLowerCase());
					}
				})
				.map((item) => {
					return (
						<motion.article
							animate={{ scale: 1.1 }}
							transition={{ duration: 0.3 }}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: false }}
							key={item.id}
						>
							<section className='product'>
								<Link to='/product-page' tabIndex='-1'>
									<motion.img
										whileTap={{ scale: 0.9 }}
										transition={{ duration: 0.1 }}
										className='image'
										src={item.image}
										onKeyDown={() => handlePreview(item.id)}
										onClick={() => handlePreview(item.id)}
										alt={item.name}
									/>
								</Link>
								<article>
									<Link to='/product-page' tabIndex='-1'>
										<h4
											className='product-title'
											tabIndex='0'
											onKeyDown={() => handlePreview(item.id)}
											onClick={() => handlePreview(item.id)}
										>
											{item.name}
										</h4>
									</Link>
									<span className='price'>${item.price}</span>
									{item.assured && (
										<span className='assured price'>A-assured</span>
									)}
									<p>
										{item.description.length > 30
											? item.description.slice(0, 70).concat("...")
											: item.description}
									</p>
									<div>
										<button
											className='add'
											onClick={() => handleAddToCart(item.id)}
										>
											Add To Cart
										</button>
										<button className='btn'>Buy Now</button>
									</div>
								</article>
							</section>
						</motion.article>
					);
				})}
		</>
	);
};

export default Products;

// Slice being used: FilterSlice and DataSlice
// Products are being rendered after passing through all the filters
// Being imported in Furniture.js
