import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductPage = () => {
	const product = [JSON.parse(localStorage.getItem("product"))];

	//used in animations
	const variants = {
		hidden: { opacity: 0.5, scale: 0.4, transition: { duration: 0.3 } },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
	};
	return (
		<>
			{product.map((item) => {
				let discountedPrice = item.price * (item.discount / 100);
				let price = item.price - discountedPrice;
				price.toFixed(2);
				return (
					<motion.section
						animate='visible'
						initial='hidden'
						variants={variants}
						className='content-wrapper'
						key={item.id}
					>
						<article className='content'>
							<img src={item.image} alt={item.name} />
							<section className='description'>
								<h3>{item.name}</h3>
								<p className='offeredby'>
									Offered by: <span>{item.company}</span>
								</p>
								<p className='des'>{item.description}</p>
								<p>
									Available Colors:
									{item.color.map((color) => {
										return (
											<span
												key={color}
												className='color'
												style={{ backgroundColor: color }}
											></span>
										);
									})}
								</p>
								<div className='pricing'>
									{item.discount ? (
										<>
											<p className='discounted'>
												Price: <span> ${price}</span>
											</p>
											<p className='rate'>
												<span> ${item.price.toFixed(2)}</span>
											</p>
										</>
									) : (
										<p className='discounted'>
											Price: <span> ${item.price.toFixed(2)}</span>
										</p>
									)}
								</div>

								{item.shipping ? (
									<p className='delivery-available'>
										Delivered To Your Door Step
									</p>
								) : (
									<p className='no-delivery'>Delivery Not Avaliable</p>
								)}
							</section>
							<div>
								<button className='productpage-btn'>Add To Cart</button>
								<button className='productpage-btn buy-btn'>Buy Now</button>
								<Link to='/' tabIndex='-1'>
									<button className='productpage-btn back-btn'>
										Continue Shopping
									</button>
								</Link>
							</div>
						</article>
					</motion.section>
				);
			})}
		</>
	);
};

export default ProductPage;

// Being imported in : 1)App.js
