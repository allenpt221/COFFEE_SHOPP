
import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";



const CategoryPage = () => {
	const { fetchbyDrink, products, loading } = useProductStore();

	const { category  } = useParams();

	useEffect(() => {
		fetchbyDrink(category);
	}, [fetchbyDrink, category]);


	const categoryTitles = {
		iceddrinks: "Chilled Brews",
		hotdrinks: "Warm Brews",
		blended: "Blended Cafe",
		noncoffee: "Caffeine-Free Favorites",
		desserts: "Sweet Treats"
	};

	const displayTitle = categoryTitles[category] || "Our Menu";

	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-4xl sm:text-5xl font-bold  mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{displayTitle}
				</motion.h1>
				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{ !loading &&products?.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							Menu coming soon
						</h2>
					)}
					{loading ? 
						Array.from({ length: 10 }).map((_, index) => (
						<div
							key={index}
							className="w-[300px] shrink-0 shadow-lg border p-4 rounded animate-pulse"
						>
							<div className="w-full h-40 bg-gray-200 rounded mb-4" />
							<div className="h-4 bg-gray-200 rounded mb-2 w-2/3" />
							<div className="h-3 bg-gray-200 rounded w-full" />
						</div>
						))
					 : 
						products?.map((product) => (	
							<ProductCard key={product._id} product={product} />
						))}
				</motion.div>
			</div>
		</div>
	);
};
export default CategoryPage;
