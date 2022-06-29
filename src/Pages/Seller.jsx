import { useState, useEffect } from "react";
import {
	Stack,
	TextField,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { postProductDataThunk } from "../Redux/Thunks/PostThunk";

const Seller = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [shipping, setShipping] = useState("");
	const [assured, setAssured] = useState("");
	const [stock, setStock] = useState("");
	const [category, setCategory] = useState("");
	const [company, setCompany] = useState("");
	const [image, setImage] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [material, setMaterial] = useState("");
	const [discount, setDiscount] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const productData = {
			name,
			shipping,
			assured,
			stock,
			category,
			company,
			image,
			price,
			discount,
			description,
			material,
			featured: true,
			color: ["#00ffff", "#ff00ff", "#909090"],
		};
		dispatch(postProductDataThunk(productData));
	};

	return (
		<div
			style={{
				marginTop: "5rem",
				background: "pink",
				padding: "2rem 4rem",
				width: "50rem",
			}}
		>
			<Stack sx={{ minWidth: 120 }}>
				<TextField
					size='small'
					id='outlined-basic'
					label='Product Name'
					variant='outlined'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<FormControl size='small'>
					<InputLabel id='demo-simple-select-label'>Shipping</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={shipping}
						label='shipping'
						onChange={(e) => setShipping(e.target.value)}
					>
						<MenuItem value={true}>true</MenuItem>
						<MenuItem value={false}>false</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small'>
					<InputLabel id='demo-simple-select-label'>Assured</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={assured}
						label='assured'
						onChange={(e) => setAssured(e.target.value)}
					>
						<MenuItem value={true}>true</MenuItem>
						<MenuItem value={false}>false</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small'>
					<InputLabel id='demo-simple-select-label'>Stock</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={stock}
						label='stock'
						onChange={(e) => setStock(e.target.value)}
					>
						<MenuItem value='Available'>Available</MenuItem>
						<MenuItem value='Limited'>Limited</MenuItem>
						<MenuItem value='Comming Soon'>Comming Soon</MenuItem>
						<MenuItem value='Out Of Stock'>Out Of Stock</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small'>
					<InputLabel id='demo-simple-select-label'>Discount</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={discount}
						label='Discount'
						onChange={(e) => setDiscount(e.target.value)}
					>
						<MenuItem value={5}>5%</MenuItem>
						<MenuItem value={10}>10%</MenuItem>
						<MenuItem value={25}>25%</MenuItem>
						<MenuItem value={35}>35%</MenuItem>
						<MenuItem value={50}>50%</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small'>
					<InputLabel id='demo-simple-select-label'>Category</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={category}
						label='category'
						onChange={(e) => setCategory(e.target.value)}
					>
						<MenuItem value='Office'>Office</MenuItem>
						<MenuItem value='Living room'>Living room</MenuItem>
						<MenuItem value='Bedroom'>Bedroom</MenuItem>
						<MenuItem value='Kitchen'>Kitchen</MenuItem>
						<MenuItem value='Dining'>Dining</MenuItem>
						<MenuItem value='Kids'>Kids</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small'>
					<InputLabel id='demo-simple-select-label'>Material</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={material}
						label='Material'
						onChange={(e) => setMaterial(e.target.value)}
					>
						<MenuItem value='Leather'>Leather</MenuItem>
						<MenuItem value='Sponge'>Sponge</MenuItem>
						<MenuItem value='Plastic'>Plastic</MenuItem>
						<MenuItem value='Solid Wood'>Solid Wood</MenuItem>
						<MenuItem value='Foam'>Foam</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id='outlined-basic'
					label='Brand'
					value={company}
					size='small'
					onChange={(e) => setCompany(e.target.value)}
				/>
				<TextField
					id='outlined-basic'
					label='Image URL'
					value={image}
					size='small'
					onChange={(e) => setImage(e.target.value)}
				/>
				<TextField
					id='outlined-basic'
					label='Price'
					value={price}
					size='small'
					onChange={(e) => setPrice(e.target.value)}
				/>
				<TextField
					id='outlined-basic'
					label='Product Description'
					value={description}
					multiline
					rows={4}
					size='small'
					onChange={(e) => setDescription(e.target.value)}
				/>

				<Button variant='contained' onClick={handleSubmit}>
					Send
				</Button>
			</Stack>
		</div>
	);
};

export default Seller;
