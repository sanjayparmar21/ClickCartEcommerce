import { useSelector } from "react-redux";

const Cart = () => {
	const cart = useSelector((state) => state.cart.cart);

	return (
		<>
			{cart.map((product) => {
				return (
					<article className='cart-container' key={product.id}>
						<img src={product.image} alt={product.name} />
						<div className='cart-info'>
							<h4>{product.name}</h4>
							<p>{product.description}</p>
							<p>${product.price}</p>
						</div>
					</article>
				);
			})}
		</>
	);
};

export default Cart;
