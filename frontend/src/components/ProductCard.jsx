import { useCartStore } from "@/stores/useCartStore";
import { UserStore } from "@/stores/userStore";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

	const navigate = useNavigate();
	const { user } = UserStore();
	const { addToCart, orderto } = useCartStore();

	const handleAddToCart = () => {
		if(!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
		}
	};

	const OrderNow = () => {
		if(!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			orderto(product);
			navigate('/cart')
		}
	}

	function UppercaseFirstLetter(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className='flex w-full flex-col gap-10 h-[23.5rem]  overflow-hidden rounded-sm border border-[#52515148] shadow-lg'>
			<div className='relative mx-3 mt-3 flex   overflow-hidden rounded-xl'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
			</div>
			<div className='px-4'>
				<div className='flex items-center justify-between'>
				<h1 className='text-lg font-semibold tracking-tight'>{product.name}</h1>
					<p>
						<span className='text-md font-medium '>₱{product.price}</span>
					</p>
				</div>
				<p className="text-xs mt-2">{UppercaseFirstLetter(product.description)}</p>
			</div>
            <div className="mt-auto flex justify-end py-2 px-3">
                <div className="flex gap-2">
                <button 
				onClick={OrderNow}
				className="text-xs border px-2 py-1 cursor-pointer bg-[#000] text-white hover:text-black hover:bg-white transition-all duration-300 ease-in">
                    Order now
                </button>
                <button 
					onClick={handleAddToCart}
				className="text-xs border px-2 py-1 cursor-pointer hover:text-white hover:bg-black transition-all duration-300 ease-in">
                    Add to Cart
                </button>
                </div>
            </div>
		</div>
	);
};
export default ProductCard;