import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { IoMdClose } from "react-icons/io";
import ClockLoader from "react-spinners/ClockLoader";
import { useDebounce } from "../app/hooks/useDebounce";
import ProductSearchComponent from "./ProductSearchComponent";
import '../App.css'
import API from './helper/api'

const containerVariants = {
	expanded: {
		height: "20em",
		marginTop: "25px",
	},
	collapsed: {
		height: "3em",
		marginTop: "25px",
	},
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

const SearchBar = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [ref, isClickedOutside] = useClickOutside();
	const inputRef = useRef();
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [noProducts, setNoProducts] = useState(false);

	const isProductsEmpty = !products || products?.length === 0;


	const expandContainer = () => {
		setIsExpanded(true);
	};

	const collapseContainer = () => {
		setIsExpanded(false);
		setIsLoading(false);
		setNoProducts(false);
		setProducts([]);
	};



	useEffect(() => {
		if (isClickedOutside) {
			collapseContainer();
		}
	}, [isClickedOutside]);

	const prepareSearchQuery = query => {
		let url;
		url = `${API}/product/products?search=${query}`

		return encodeURI(url);
	};

	const searchProducts = async () => {
		if (!searchQuery || searchQuery.trim().length === 0) {
			return;
		}

		setIsLoading(true);

		const URL = prepareSearchQuery(searchQuery);

		const response = await axios
			.get(URL)
			.catch(err => {
				console.log(err);
			});


		if (response) {
			if (

				response.data.products?.length === 0
			) {
				setNoProducts(true);
			}


			setProducts(response.data.products);

			console.log(products)

		}

		setIsLoading(false);
	};

	useDebounce(searchQuery, 500, searchProducts);

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<motion.div
				className='search-bar'
				animate={isExpanded ? "expanded" : "collapsed"}
				variants={containerVariants}
				transition={containerTransition}
				ref={ref}>
				<div className='search-input-container'>
					<input
						type='text'
						className='search-input'
						placeholder="Search Products"
						onFocus={expandContainer}
						ref={inputRef}
						value={searchQuery}
						onChange={e => {
							if (e.target.value.trim() === "") setNoProducts(false);
							setSearchQuery(e.target.value.toLowerCase());
						}}
					/>

					<AnimatePresence>
						{isExpanded && (
							<IoMdClose
								key='close-icon'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className='close-icon'
								onClick={() => {
									collapseContainer();
									setSearchQuery("");
								}}
							/>
						)}
					</AnimatePresence>
				</div>
				{isExpanded && <span className='line-separator'></span>}
				{isExpanded && (
					<div className='search-content'>
						{isLoading && (
							<div className='loading-wrapper'>
								<ClockLoader loading color='#eee' size={30} />
							</div>
						)}

						{!isLoading &&
							isProductsEmpty &&
							!noProducts &&
							!isLoading  ? (
							<div className='loading-wrapper'>
								<div className='warning-message'>Start typing to search</div>
							</div>
						) : null}

						{(!isLoading && noProducts && products?.length === 0) ? (
							<div className='loading-wrapper'>
								<div className='warning-message'>
									No Products Found
								</div>
							</div>
						) : null}

					
						{(!isLoading && !isProductsEmpty) ||
							(products?.length !== 0)
							? products?.map((product, index) => {
								console.log(product)
								return (
									<ProductSearchComponent
										link={`/product/${product._id}`}
										name={`${product.name} ${product.modelName}`}
										thumbnailSrc={
											
												 product?.imageUrl
							
										}
										collapseContainer={collapseContainer}
										key={index}
									/>
								);
							})
							: null}


					</div>
				)}
			</motion.div>
		</div>
	);
};

export default SearchBar;