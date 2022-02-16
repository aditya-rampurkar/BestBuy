import { useHistory } from "react-router-dom";

const ProductSearchComponent = ({
	link,
	name,
	thumbnailSrc,
	collapseContainer = undefined,
}) => {

	const history = useHistory()

	return (
		<div
			className='search-product-container mobile'
			onClick={() => {
				history.push(link)
				collapseContainer !== undefined && collapseContainer();
			}}>
			<div className='thumbnail'>
				<img src={thumbnailSrc} objectFit='contain' />
			</div>

			<span className='search-product-name'>{name}</span>
		</div>
	);
};

export default ProductSearchComponent;