const ProductCard = ({ product }) => {

	return (
		<div className='flex w-full flex-col h-[23.5rem] gap-2  overflow-hidden rounded-sm border border-[#52515148] shadow-lg relative'>
			<div className='relative mx-3 mt-3 flex   overflow-hidden rounded-xl'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
			</div>
			<div className='px-4 pb-5'>
				<div className='mt-2 flex items-center justify-between'>
				<h1 className='text-lg font-semibold tracking-tight'>{product.name}</h1>
					<p>
						<span className='text-md font-medium '>₱{product.price}</span>
					</p>
				</div>
				<p className="text-xs mt-2">{product.description}</p>
			</div>
            <div className="absolute bottom-2 right-2">
                <div className="flex gap-2">
                <button className="text-xs border px-2 py-1 cursor-pointer bg-[#000] text-white hover:text-black hover:bg-white transition-all duration-300 ease-in">
                    Order now
                </button>
                <button className="text-xs border px-2 py-1 cursor-pointer hover:text-white hover:bg-black transition-all duration-300 ease-in">
                    Add to Cart
                </button>
                </div>
            </div>
		</div>
	);
};
export default ProductCard;