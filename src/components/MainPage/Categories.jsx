import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const Categories = () => {
	const categories = [
		{
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW5SJlmB8QmFwkVo_TREQg5jghvQrOg7WZPA&usqp=CAU",
			text: "Books",
		},
		{
			img: "https://rukminim1.flixcart.com/flap/128/128/image/fbca28e1a04d03de.png?q=100",
			text: "Home & Furniture",
			path: "home-and-furniture",
		},
		{
			img: "https://rukminim1.flixcart.com/flap/128/128/image/ffc530c33840306c.png?q=100",
			text: "Electronics",
		},
		{
			img: "https://rukminim1.flixcart.com/flap/128/128/image/465fde018f876b35.png?q=100",
			text: "Beauty",
		},
	];

	return (
		<section className='categories-wrapper'>
			<article className='categories'>
				{categories.map((category) => {
					return (
						<Link to='/home-and-furniture' key={category.img}>
							<Avatar
								alt='category icon'
								src={category.img}
								sx={{ width: "5rem", height: "5rem" }}
							/>
							<p>{category.text}</p>
						</Link>
					);
				})}
			</article>
		</section>
	);
};

export default Categories;

//No Slice is used
//Being imported in MainPage.jsx
