import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import ClockLoader from "react-spinners/ClockLoader";
import ProductSearchComponent from "../../app/ProductSearchComponent";
import { useDebounce } from "../../app/hooks/useDebounce";
import API from '../../app/helper/api'
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { useEffect } from "react";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [noProducts, setNoProducts] = useState(false);

    const history = useHistory()

	const isProductsEmpty = !products || products.length === 0;

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1280px)'
      })

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

    useEffect(()=>{
        if(isDesktopOrLaptop){
            history.push("/")
        }
    },[isDesktopOrLaptop])

	return (
		<div>
			<div className='search-input-container mobile'>
				<IoMdArrowBack
					className='search-icon'
					style={{ color: "#000" }}
					onClick={() => history.push("/")}
				/>
				<input
					type='text'
					className='search-input mobile'
					placeholder='Search products and categories'
					value={searchQuery}
					onChange={e => {
						if (e.target.value.trim() === "") setNoProducts(false);
						setSearchQuery(e.target.value.toLowerCase());
					}}
				/>

				<AnimatePresence>
					{searchQuery.length > 0 && (
						<IoMdClose
							key='close-icon'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='close-icon'
							onClick={() => {
								setSearchQuery("");
							}}
						/>
					)}
				</AnimatePresence>
			</div>
			<div className='search-content'>
				{isLoading && (
					<div className='loading-wrapper mobile'>
						<ClockLoader loading color='#eee' size={30} />
					</div>
				)}

                            {!isLoading &&
							isProductsEmpty &&
							!noProducts &&
							!isLoading  ? (
							<div className='loading-wrapper mobile'>
								<div className='warning-message'>Start typing to search</div>
							</div>
						) : null}

        {(!isLoading && noProducts && products?.length === 0) ? (
							<div className='loading-wrapper mobile'>
								<div className='warning-message'>
									No Products Found
								</div>
							</div>
						) : null}


				{!isLoading && products.length !== 0 && (
					<h3 style={{ padding: "5px 15px" }}>Products</h3>
				)}
				{(!isLoading && !isProductsEmpty) || products.length !== 0
					? products.map((product, index) => {
							return (
								<ProductSearchComponent
										link={`/product/${product._id}`}
										name={`${product.name} ${product.modelName}`}
										thumbnailSrc={
											
												 product?.imageUrl
							
										}
										
										key={index}
									/>
							);
					  })
					: null}

				
			</div>
		</div>
	);
};

export default Search;